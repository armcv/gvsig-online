from collections import defaultdict
from django.shortcuts import HttpResponse
import pandas as pd
import requests
import json
from .models import database_connections
from .forms import UploadFileForm
from sqlalchemy import Column, DateTime, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import MetaData, Table

from sqlalchemy import create_engine
from .settings import GEOETL_DB

#etl_tasks
def format_sentilo_data_etl(entities):
    filteredEntities = filter(lambda entity: "council_data" in entity and "value" in entity["council_data"] and entity["council_data"]["value"]["municipality"] == "cullera", entities)
    finalList = []
    list_tmp = {}
    # print(entities[1])
    for entity in filteredEntities:
        componentSubStringIndex =  entity['id'].find("CUA")
        componentSensor = entity['id'][componentSubStringIndex:-3]
        metadata = entity["description"]["value"]
        observation_time = entity[metadata]["metadata"]["samplingTime"]["value"]
        tipo = entity['type']
        uom = ""
        try: 
            uom = entity["_uom"]["value"]
            entity["uom"] = uom
        except Exception as e:
            print("Error getting uom")
        observation_value = 0
        try: 
            observation_value = float(entity[metadata]["value"])
        except Exception as e:
            print("Error getting observation_value", e)
            observation_value = 0
        observation_string = str(entity[metadata]["value"])
        try:
            observation_string = observation_string + " " + uom
        except Exception as e:
            print("Error getting observation_string", e)
        lat = entity["location"]["value"]["lat"]
        lng = entity["location"]["value"]["lng"]
        list_tmp = {
            "component": componentSensor,
            "observation_time": observation_time,
            "lat": lat,
            "lng": lng,
            "tipo": tipo,
            "metadata": metadata.lower(),
            metadata.lower() + "_string": observation_string,
            metadata.lower() + "_value": observation_value,
            metadata.lower() + "_uom": uom
        }
        finalList.append(list_tmp)


    grouped_data = defaultdict(lambda: {'metadata': set()})
    for item in finalList:
        key = (item['component'], item['observation_time'], item['lat'], item['lng'])

        if key not in grouped_data:
            grouped_data[key]['component'] = item['component']
            grouped_data[key]['observation_time'] = item['observation_time']
            grouped_data[key]['lat'] = item['lat']
            grouped_data[key]['lng'] = item['lng']
        grouped_data[key]['tipo'] = set()
        grouped_data[key]['metadata'] = set()
        
    for item in finalList:
        key = (item['component'], item['observation_time'], item['lat'], item['lng'])
        grouped_data[key]['tipo'].add(item['tipo'])
        grouped_data[key]['metadata'].add(item['metadata'])
        metas = filter(lambda key: key.startswith(item['metadata']), item.keys())
        for meta in metas:
            grouped_data[key][meta] = item[meta]
    

    output = []

    for key, value in grouped_data.items():
        value['tipo'] = ','.join(value['tipo'])   
        value['metadata'] = ','.join(value['metadata'])

        output.append(value)

    keys = set()
    for item in output:
        keys.update(item.keys())
    keys = list(keys)
    keys.sort()
    return output, keys

def sentilo_http_request(baseUrl, sensors, apikey):
    headers = {'Authorization': 'Bearer ' + apikey}
    entitiesRequest = requests.get(baseUrl, headers=headers)
    entities = []
    global_status_code = entitiesRequest.status_code
    if global_status_code == 200:
        entities = entitiesRequest.json()
    for sensor in sensors:
        urlEntities = baseUrl + "/" + sensor
        httpRequest = requests.get(urlEntities, headers=headers)
        status_code = httpRequest.status_code
        if status_code == 200:
            entities.append(httpRequest.json())
    return entities

def input_Sentilo_etl(dicc):
    api  = database_connections.objects.get(name = dicc['api'])
    sensors = dicc["sensors"].split(",")

    params_str = api.connection_params
    params = json.loads(params_str)

    conn_string = 'postgresql://'+GEOETL_DB['user']+':'+GEOETL_DB['password']+'@'+GEOETL_DB['host']+':'+GEOETL_DB['port']+'/'+GEOETL_DB['database']
    db = create_engine(conn_string)
    conn = db.connect()

    table_name = dicc['id']
    urlEntities = params["domain"]
    entities = sentilo_http_request(urlEntities, sensors, params['identity-key'])
    output, _ = format_sentilo_data_etl(entities)
    db_table_name = dicc['table_name']
    db_columns = dicc['schema']

    Base = declarative_base()

    # Definir el modelo de la tabla
    class DatosAmbientales(Base):
        __tablename__ = db_table_name
        component = Column(String, primary_key=True)
        lat = Column(Float, primary_key=True)
        lng = Column(Float, primary_key=True)
        observation_time = Column(DateTime, primary_key=True)
        tipo = Column(String)

    # Crear la tabla si no existe
    Base.metadata.create_all(db)

    metadata = MetaData(bind=db)

    # Cargar la definición de la tabla vía reflexión
    tabla = Table(db_table_name, metadata, autoload_with=db)

    # Obtener e imprimir los nombres de las columnas
    nombres_de_columnas = [column.name for column in tabla.columns]
    for col in db_columns: 
        if col.lower() not in nombres_de_columnas:
            column = None
            print(col)
            if col.endswith("_value"):
                column = Column(col, Float)
            else:
                column = Column(col, String)
            tabla.append_column(column)
            with db.connect() as alter_conn:
                alter_conn.execute(f'ALTER TABLE {tabla.name} ADD COLUMN {col} {column.type.compile(db.dialect)}')

    df = pd.json_normalize(output)

    df_obj = df.select_dtypes(['object'])
    df[df_obj.columns] = df_obj.apply(lambda x: x.str.lstrip(' '))
    df.to_sql(table_name, con=conn, schema= GEOETL_DB['schema'], if_exists='replace', index=False)
    conn.close()
    db.dispose()
    
    return [table_name]


def etl_schema_sentilo_etl(request):
    if request.method == 'POST':
        jsParams = json.loads(request.POST['jsonparamsSentilo'])
        dicc = jsParams['parameters'][0]
        api  = database_connections.objects.get(name = dicc['api'])
        sensors = dicc["sensors"].split(",")
        params_str = api.connection_params
        params = json.loads(params_str)
        urlEntities = params["domain"]
        entities = sentilo_http_request(urlEntities, sensors, params['identity-key'])

        _, keys = format_sentilo_data_etl(entities)
        form = UploadFileForm(request.POST)
        if form.is_valid():
            response = json.dumps(keys)
            return HttpResponse(response, content_type="application/json")