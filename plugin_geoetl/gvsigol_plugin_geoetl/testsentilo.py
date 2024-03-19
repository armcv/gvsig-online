from collections import defaultdict
import pprint
import requests

baseUrl = "https://connecta.dival.es/apidata/ngsi/v4/"
urlEntities = "https://connecta.dival.es/apidata/ngsi/v4/entities"
token = "7d389973-aaaf-3896-bd6e-d9494efa7690"
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
}



entitiesRequest = requests.get(urlEntities, headers=headers)
entities = entitiesRequest.json()
filteredEntities = filter(lambda entity: "council_data" in entity and "value" in entity["council_data"] and entity["council_data"]["value"]["municipality"] == "cullera", entities)
finalList = []
listaSensores = []
list_tmp = {}
# print(entities[1])
for entity in filteredEntities:
    componentSubStringIndex =  entity['id'].find("CUA")
    componentSensor = entity['id'][componentSubStringIndex:-3]
    sensor = entity['id'][-3:]
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
    
    
    
    agrupado = {}
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
    #print(list_tmp)
    finalList.append(list_tmp)
pprint.pprint(finalList)

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
pprint.pprint(keys)