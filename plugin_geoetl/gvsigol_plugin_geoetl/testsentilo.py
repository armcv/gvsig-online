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
entities = []
globalStatusCode = entitiesRequest.status_code
if globalStatusCode == 200:
    entities = entitiesRequest.json()
else: 
    print("Error getting entities", globalStatusCode, entitiesRequest.json())
sensors = ["ONSTREETPARKINGCUAPPC23S01","ONSTREETPARKINGCUAPPC35S01","ONSTREETPARKINGCUAPPC56S01","PEOPLECOUNTERCUAPPC69S01","PEOPLECOUNTERCUAPPC70S01","PEOPLECOUNTERCUAPPC71S01","PEOPLECOUNTERCUAPPC72S01","PEOPLECOUNTERCUAPPC73S01","PEOPLECOUNTERCUAPPC74S01","PEOPLECOUNTERCUAPPC75S01","PEOPLECOUNTERCUAPPC76S01","ONSTREETPARKINGCUAPPC66S01","WifiBluDetectorCUAC0004S01"]
for sensor in sensors:
    urlForRequest = urlEntities + "/" + sensor
    httpRequest = requests.get(urlForRequest, headers=headers)
    statusCode = httpRequest.status_code
    if statusCode == 200:
        entities.append(httpRequest.json())
    else:
        print("Error getting entities", statusCode, httpRequest.json())





from collections import defaultdict

def format_sentilo_data(entities):
    # Filter entities with required criteria
    filtered_entities = [
        e for e in entities if "council_data" in e and "value" in e["council_data"] and e["council_data"]["value"]["municipality"] == "cullera"
    ]

    # Process entities to extract required information
    processed_entities = []
    for entity in filtered_entities:
        component_index = entity['id'].find("CUA")
        component_sensor = entity['id'][component_index:-3]
        metadata = entity["description"]["value"]
        uom = entity.get("_uom", {}).get("value", "")
        try:
            observation_value = float(entity[metadata]["value"])
        except:
            print("Error converting observation_value")
            observation_value = 0

        observation_string = f'{entity[metadata]["value"]} {uom}'.strip()
        processed_entities.append({
            "component": component_sensor,
            "observation_time": entity[metadata]["metadata"]["samplingTime"]["value"],
            "lat": entity["location"]["value"]["lat"],
            "lng": entity["location"]["value"]["lng"],
            "tipo": entity['type'],
            "metadata": metadata.lower(),
            f"{metadata.lower()}_string": observation_string,
            f"{metadata.lower()}_value": observation_value,
            f"{metadata.lower()}_uom": uom,
        })

    # Group data
    grouped_data = defaultdict(lambda: {'tipo': set(), 'metadata': set()})
    for item in processed_entities:
        key = (item['component'], item['observation_time'], item['lat'], item['lng'])
        grouped_data[key].update({
            'component': item['component'],
            'observation_time': item['observation_time'],
            'lat': item['lat'],
            'lng': item['lng'],
        })
        grouped_data[key]['tipo'].add(item['tipo'])
        grouped_data[key]['metadata'].add(item['metadata'])
        for k, v in item.items():
            if k.startswith(item['metadata']):
                grouped_data[key][k] = v

    # Finalize output format
    output = [{
        **value,
        'tipo': ','.join(value['tipo']),
        'metadata': ','.join(value['metadata'])
    } for _, value in grouped_data.items()]

    keys = {k for item in output for k in item.keys()}
    sortedKeys = list(keys)
    sortedKeys.sort()
    return output, sortedKeys
formatted_entities, keys = format_sentilo_data(entities)
pprint.pprint(formatted_entities)
pprint.pprint(keys)