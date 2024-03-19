# -*- coding: utf-8 -*-


import datetime
import pprint
import pandas as pd
import requests


dicc = {'api': 'sentilo-publico',
 'checkbox-end': '',
 'checkbox-init': '',
 'end-date': '',
 'get_proced-list': [],
 'id': '2d7de648-0e49-a83c-831d-e98182a59066',
 'init-date': '',
 'schema': ['provider',
            'sentiloid',
            'sensor',
            'description',
            'dataType',
            'location',
            'type',
            'unit',
            'timeZone',
            'publicAccess',
            'component',
            'componentType',
            'componentDesc',
            'componentPublicAccess',
            'componentAdditionalInfo',
            'technicalDetails',
            'componentTechnicalDetails']}

def input_Sentilo(dicc):
    pprint.pprint(dicc)


    # params = {
    #     "domain": "http://sentilo.lynsoluciones.es:8081",
    #     "identity-key": "d26f5ca8665edc8859aad020cdac11f31daba09d82a15bcbb531c7cd3af5c290",
    #     "provider": "gvsigonlineApp_provider",
    #     #"init_date":  "10/09/2023 10:00:00",
    #     #"end_date": "10/01/2024 10:00:00",
    #     #"limit": "10"   
    #     }
    
    params = {
        "domain": "https://connecta.dival.es/apidata/ngsi/v4/entities",
        "identity-key": "7d389973-aaaf-3896-bd6e-d9494efa7690",
        #"provider": "gvsigonlineApp_provider",
        #"init_date":  "10/09/2023 10:00:00",
        #"end_date": "10/01/2024 10:00:00",
        #"limit": "10"   
        }

    # # data_obs = {
    #     "sensors": [
    #         {
    #             "sensor": "Sensor1",
    #             "observations": [
    #                 {
    #                     "value": "20",
    #                     "timestamp": "26/02/2024T12:34:45",
    #                     "time": 1708950885000
    #                 },
    #                 {
    #                     "value": "21",
    #                     "timestamp": "27/02/2024T12:34:45",
    #                     "time": 1708950885000
    #                 }
    #             ]
    #         },
    #         {
    #             "sensor": "Sensor2",
    #             "observations": [
    #                 {
    #                     "value": "19",
    #                     "timestamp": "26/02/2024T12:34:45",
    #                     "time": 1708950885000
    #                 }
    #             ]
    #         }
    #     ]
    # }

    # aqui hacer la llamada http con los parametros de conección que hay en params y esto va a dar un json
    #jsonObject = http.request(algo)
    provider = params['provider']
    limit = params['limit']
    init_date = params['init_date']
    end_date = params['end_date']
    init_date_parts = init_date.split(" ")
    end_date_parts = end_date.split(" ")
    
    init_date_list = init_date_parts[0].split("/")
    end_date_list = end_date_parts[0].split("/")
    init_date = datetime.date(int(init_date_list[2]), int(init_date_list[1]), int(init_date_list[0]))
    end_date = datetime.date(int(end_date_list[2]), int(end_date_list[1]), int(end_date_list[0]))
    #init_date = datetime.strptime(init_date, "%d/%m/%Y %H:%M:%S")
    #end_date = datetime.strptime(end_date, "%d/%m/%Y %H:%M:%S")
    print(init_date)
    print(end_date)

    url = params["domain"]
    url += "/catalog/" + provider
    headers = {'IDENTITY_KEY': params['identity-key']}
    resp = requests.get(url=url, headers=headers)
    response =resp.json()
    print(response)
    final_response = []
    providers = response["providers"]
    if limit != "" and init_date == "" and end_date == "":
        urlData = params["domain"] + "/data/" + provider + "/?limit=" + limit
    elif limit == "" and init_date != "" and end_date == "":
        init_date = init_date.strftime("%d/%m/%YT%H:%M:%S")
        today = datetime.today()
        end_date = today.strftime("%d/%m/%YT%H:%M:%S")
        urlData = params["domain"] + "/data/" + provider + "/?from=" + init_date + "&to=" + end_date 
    elif init_date != "" and end_date != "":
        try:
            if init_date <= end_date:
                init_date = init_date.strftime( "%d/%m/%YT%H:%M:%S")
                end_date = end_date.strftime( "%d/%m/%YT%H:%M:%S")
                urlData = params["domain"] + "/data/" + provider + "/?from=" + init_date + "&to=" + end_date 
        except:
            print("La fecha final debe de ser mayor que la inicial")
    else:
        urlData = params["domain"] + "/data/" + provider
            
        
        
    urlData = params["domain"] + "/data/" + provider
    resData = requests.get(url=urlData, headers=headers)
    responseData =resData.json()
    #responseData = data_obs
    print(responseData)
    for provider in providers:
        sensors = provider["sensors"]
        for sensor in sensors:
            for sensorData in responseData["sensors"]:
                if sensorData["sensor"] == sensor["sensor"]:
                    for observation in sensorData["observations"]:
                        sensor["observation_vale"] = observation["value"]
                        sensor["timestamp"] = observation["timestamp"]
                        sensor["sentiloid"] = str(observation["time"]) + sensor["sensor"]
            sensor["provider"] = provider["provider"]
        final_response.extend(sensors)
    df = pd.json_normalize(final_response)

    #print(final_response)
    # pprint.pprint(final_response)
    df = pd.json_normalize(final_response)

    #df = pd.read_json(dicc['json-file'])
    print(df)
    #print(df["sentiloid"].head())
    #print(df.columns)
  


input_Sentilo(dicc)

