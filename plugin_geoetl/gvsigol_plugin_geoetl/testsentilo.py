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

    return output, list(keys)

pprint.pprint(format_sentilo_data(entities))