from datetime import datetime, date
import pprint


data = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7188",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7188,
                "pm1_0_string": "4.74 ug/m3",
                "pm1_0_value": 4.74,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.74 ug/m3",
                "pm10_value": 4.74,
                "pm10_uom": "ug/m3",
                "no2_string": "83.28 ug/m3",
                "no2_value": 83.28,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.19,
                "pm2_5_string": "2.19 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 73.5,
                "o3_string": "73.5 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T00:02:26Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7191",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7191,
                "pm1_0_string": "4.8 ug/m3",
                "pm1_0_value": 4.8,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.8 ug/m3",
                "pm10_value": 4.8,
                "pm10_uom": "ug/m3",
                "no2_string": "78.4 ug/m3",
                "no2_value": 78.4,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.32,
                "pm2_5_string": "2.32 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 71.15,
                "o3_string": "71.15 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T00:21:42Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7195",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7195,
                "pm1_0_string": "4.67 ug/m3",
                "pm1_0_value": 4.67,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.67 ug/m3",
                "pm10_value": 4.67,
                "pm10_uom": "ug/m3",
                "no2_string": "78.02 ug/m3",
                "no2_value": 78.02,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.61,
                "pm2_5_string": "3.61 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 70.36,
                "o3_string": "70.36 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T00:34:33Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7199",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7199,
                "pm1_0_string": "4.57 ug/m3",
                "pm1_0_value": 4.57,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.57 ug/m3",
                "pm10_value": 4.57,
                "pm10_uom": "ug/m3",
                "no2_string": "81.22 ug/m3",
                "no2_value": 81.22,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.32,
                "pm2_5_string": "3.32 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 72.13,
                "o3_string": "72.13 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T00:47:26Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7203",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7203,
                "pm1_0_string": "4.64 ug/m3",
                "pm1_0_value": 4.64,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.64 ug/m3",
                "pm10_value": 4.64,
                "pm10_uom": "ug/m3",
                "no2_string": "58.28 ug/m3",
                "no2_value": 58.28,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.88,
                "pm2_5_string": "3.88 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 59.58,
                "o3_string": "59.58 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T01:06:42Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7207",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7207,
                "pm1_0_string": "4.72 ug/m3",
                "pm1_0_value": 4.72,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.72 ug/m3",
                "pm10_value": 4.72,
                "pm10_uom": "ug/m3",
                "no2_string": "57.34 ug/m3",
                "no2_value": 57.34,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.85,
                "pm2_5_string": "3.85 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 62.33,
                "o3_string": "62.33 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T01:13:07Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7211",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7211,
                "pm1_0_string": "4.39 ug/m3",
                "pm1_0_value": 4.39,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.39 ug/m3",
                "pm10_value": 4.39,
                "pm10_uom": "ug/m3",
                "no2_string": "76.33 ug/m3",
                "no2_value": 76.33,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.23,
                "pm2_5_string": "2.23 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 70.56,
                "o3_string": "70.56 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T01:33:19Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7215",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7215,
                "pm1_0_string": "4.46 ug/m3",
                "pm1_0_value": 4.46,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.46 ug/m3",
                "pm10_value": 4.46,
                "pm10_uom": "ug/m3",
                "no2_string": "75.95 ug/m3",
                "no2_value": 75.95,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3,
                "pm2_5_string": "3 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 73.11,
                "o3_string": "73.11 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T01:48:46Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7219",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7219,
                "pm1_0_string": "4.19 ug/m3",
                "pm1_0_value": 4.19,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.19 ug/m3",
                "pm10_value": 4.19,
                "pm10_uom": "ug/m3",
                "no2_string": "78.02 ug/m3",
                "no2_value": 78.02,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.71,
                "pm2_5_string": "2.71 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 73.3,
                "o3_string": "73.3 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T02:04:13Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7223",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7223,
                "pm1_0_string": "4.27 ug/m3",
                "pm1_0_value": 4.27,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.27 ug/m3",
                "pm10_value": 4.27,
                "pm10_uom": "ug/m3",
                "no2_string": "81.22 ug/m3",
                "no2_value": 81.22,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.75,
                "pm2_5_string": "2.75 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 72.52,
                "o3_string": "72.52 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T02:19:40Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7227",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7227,
                "pm1_0_string": "4.98 ug/m3",
                "pm1_0_value": 4.98,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.98 ug/m3",
                "pm10_value": 4.98,
                "pm10_uom": "ug/m3",
                "no2_string": "82.34 ug/m3",
                "no2_value": 82.34,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.59,
                "pm2_5_string": "2.59 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 76.44,
                "o3_string": "76.44 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T02:35:07Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7231",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7231,
                "pm1_0_string": "4.36 ug/m3",
                "pm1_0_value": 4.36,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.36 ug/m3",
                "pm10_value": 4.36,
                "pm10_uom": "ug/m3",
                "no2_string": "81.59 ug/m3",
                "no2_value": 81.59,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.74,
                "pm2_5_string": "2.74 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 75.07,
                "o3_string": "75.07 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T02:50:34Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7235",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7235,
                "pm1_0_string": "4.97 ug/m3",
                "pm1_0_value": 4.97,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.97 ug/m3",
                "pm10_value": 4.97,
                "pm10_uom": "ug/m3",
                "no2_string": "75.95 ug/m3",
                "no2_value": 75.95,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.11,
                "pm2_5_string": "2.11 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 72.72,
                "o3_string": "72.72 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T03:06:01Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7238",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7238,
                "pm1_0_string": "4.8 ug/m3",
                "pm1_0_value": 4.8,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.8 ug/m3",
                "pm10_value": 4.8,
                "pm10_uom": "ug/m3",
                "no2_string": "75.39 ug/m3",
                "no2_value": 75.39,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.66,
                "pm2_5_string": "2.66 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 71.15,
                "o3_string": "71.15 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T03:21:28Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7242",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7242,
                "pm1_0_string": None,
                "pm1_0_value": None,
                "pm1_0_uom": None,
                "pm10_string": None,
                "pm10_value": None,
                "pm10_uom": None,
                "no2_string": "76.52 ug/m3",
                "no2_value": 76.52,
                "no2_uom": "ug/m3",
                "pm2_5_value": None,
                "pm2_5_string": None,
                "pm2_5_uom": None,
                "o3_value": 72.13,
                "o3_string": "72.13 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T03:36:54Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7243",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7243,
                "pm1_0_string": "4.9 ug/m3",
                "pm1_0_value": 4.9,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.9 ug/m3",
                "pm10_value": 4.9,
                "pm10_uom": "ug/m3",
                "no2_string": None,
                "no2_value": None,
                "no2_uom": None,
                "pm2_5_value": 2.02,
                "pm2_5_string": "2.02 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": None,
                "o3_string": None,
                "o3_uom": None,
                "observation_time": "2024-03-20T03:36:55Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7247",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7247,
                "pm1_0_string": "4.99 ug/m3",
                "pm1_0_value": 4.99,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.99 ug/m3",
                "pm10_value": 4.99,
                "pm10_uom": "ug/m3",
                "no2_string": "82.72 ug/m3",
                "no2_value": 82.72,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.99,
                "pm2_5_string": "2.99 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 73.11,
                "o3_string": "73.11 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T03:50:41Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7251",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7251,
                "pm1_0_string": "4.08 ug/m3",
                "pm1_0_value": 4.08,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.08 ug/m3",
                "pm10_value": 4.08,
                "pm10_uom": "ug/m3",
                "no2_string": "82.34 ug/m3",
                "no2_value": 82.34,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.37,
                "pm2_5_string": "2.37 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 72.91,
                "o3_string": "72.91 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T04:03:32Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7255",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7255,
                "pm1_0_string": "4.77 ug/m3",
                "pm1_0_value": 4.77,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.77 ug/m3",
                "pm10_value": 4.77,
                "pm10_uom": "ug/m3",
                "no2_string": "74.07 ug/m3",
                "no2_value": 74.07,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.65,
                "pm2_5_string": "2.65 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 69.58,
                "o3_string": "69.58 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T04:22:48Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7259",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7259,
                "pm1_0_string": "4.85 ug/m3",
                "pm1_0_value": 4.85,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.85 ug/m3",
                "pm10_value": 4.85,
                "pm10_uom": "ug/m3",
                "no2_string": "73.32 ug/m3",
                "no2_value": 73.32,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.4,
                "pm2_5_string": "2.4 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 69.97,
                "o3_string": "69.97 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T04:35:39Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7262",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7262,
                "pm1_0_string": "4.05 ug/m3",
                "pm1_0_value": 4.05,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.05 ug/m3",
                "pm10_value": 4.05,
                "pm10_uom": "ug/m3",
                "no2_string": "71.63 ug/m3",
                "no2_value": 71.63,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.84,
                "pm2_5_string": "3.84 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 69.58,
                "o3_string": "69.58 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T04:48:30Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7266",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7266,
                "pm1_0_string": "4.89 ug/m3",
                "pm1_0_value": 4.89,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.89 ug/m3",
                "pm10_value": 4.89,
                "pm10_uom": "ug/m3",
                "no2_string": "62.04 ug/m3",
                "no2_value": 62.04,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.6,
                "pm2_5_string": "3.6 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 63.11,
                "o3_string": "63.11 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T05:07:46Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7270",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7270,
                "pm1_0_string": "4.96 ug/m3",
                "pm1_0_value": 4.96,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.96 ug/m3",
                "pm10_value": 4.96,
                "pm10_uom": "ug/m3",
                "no2_string": "60.35 ug/m3",
                "no2_value": 60.35,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.03,
                "pm2_5_string": "3.03 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 63.31,
                "o3_string": "63.31 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T05:20:37Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7274",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7274,
                "pm1_0_string": "4.82 ug/m3",
                "pm1_0_value": 4.82,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.82 ug/m3",
                "pm10_value": 4.82,
                "pm10_uom": "ug/m3",
                "no2_string": "54.71 ug/m3",
                "no2_value": 54.71,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.34,
                "pm2_5_string": "3.34 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 60.76,
                "o3_string": "60.76 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T05:33:28Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7277",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7277,
                "pm1_0_string": "4.93 ug/m3",
                "pm1_0_value": 4.93,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.93 ug/m3",
                "pm10_value": 4.93,
                "pm10_uom": "ug/m3",
                "no2_string": "50.38 ug/m3",
                "no2_value": 50.38,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.07,
                "pm2_5_string": "3.07 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 56.64,
                "o3_string": "56.64 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T05:52:45Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7281",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7281,
                "pm1_0_string": "4.31 ug/m3",
                "pm1_0_value": 4.31,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.31 ug/m3",
                "pm10_value": 4.31,
                "pm10_uom": "ug/m3",
                "no2_string": "47.19 ug/m3",
                "no2_value": 47.19,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.28,
                "pm2_5_string": "3.28 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 54.68,
                "o3_string": "54.68 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T06:05:36Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7285",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7285,
                "pm1_0_string": "4 ug/m3",
                "pm1_0_value": 4,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4 ug/m3",
                "pm10_value": 4,
                "pm10_uom": "ug/m3",
                "no2_string": "72 ug/m3",
                "no2_value": 72,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.91,
                "pm2_5_string": "2.91 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 72.52,
                "o3_string": "72.52 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T06:18:27Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7289",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7289,
                "pm1_0_string": "4.37 ug/m3",
                "pm1_0_value": 4.37,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.37 ug/m3",
                "pm10_value": 4.37,
                "pm10_uom": "ug/m3",
                "no2_string": "76.52 ug/m3",
                "no2_value": 76.52,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.73,
                "pm2_5_string": "2.73 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 72.52,
                "o3_string": "72.52 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T06:37:43Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7293",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7293,
                "pm1_0_string": "4.52 ug/m3",
                "pm1_0_value": 4.52,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.52 ug/m3",
                "pm10_value": 4.52,
                "pm10_uom": "ug/m3",
                "no2_string": "68.06 ug/m3",
                "no2_value": 68.06,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.4,
                "pm2_5_string": "2.4 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 68.4,
                "o3_string": "68.4 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T06:50:34Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7298",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7298,
                "pm1_0_string": "4.77 ug/m3",
                "pm1_0_value": 4.77,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.77 ug/m3",
                "pm10_value": 4.77,
                "pm10_uom": "ug/m3",
                "no2_string": "72.57 ug/m3",
                "no2_value": 72.57,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.16,
                "pm2_5_string": "2.16 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 70.76,
                "o3_string": "70.76 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T07:03:25Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7301",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7301,
                "pm1_0_string": "4.84 ug/m3",
                "pm1_0_value": 4.84,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.84 ug/m3",
                "pm10_value": 4.84,
                "pm10_uom": "ug/m3",
                "no2_string": "69.18 ug/m3",
                "no2_value": 69.18,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.81,
                "pm2_5_string": "2.81 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 70.17,
                "o3_string": "70.17 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T07:22:41Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7305",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7305,
                "pm1_0_string": "4.4 ug/m3",
                "pm1_0_value": 4.4,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.4 ug/m3",
                "pm10_value": 4.4,
                "pm10_uom": "ug/m3",
                "no2_string": "75.2 ug/m3",
                "no2_value": 75.2,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.43,
                "pm2_5_string": "2.43 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 72.32,
                "o3_string": "72.32 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T07:35:32Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7309",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7309,
                "pm1_0_string": "4.6 ug/m3",
                "pm1_0_value": 4.6,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.6 ug/m3",
                "pm10_value": 4.6,
                "pm10_uom": "ug/m3",
                "no2_string": "64.3 ug/m3",
                "no2_value": 64.3,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.75,
                "pm2_5_string": "3.75 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 66.84,
                "o3_string": "66.84 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T07:48:23Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7312",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7312,
                "pm1_0_string": "4.12 ug/m3",
                "pm1_0_value": 4.12,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.12 ug/m3",
                "pm10_value": 4.12,
                "pm10_uom": "ug/m3",
                "no2_string": "66.18 ug/m3",
                "no2_value": 66.18,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.22,
                "pm2_5_string": "2.22 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 66.44,
                "o3_string": "66.44 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T08:07:40Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7316",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7316,
                "pm1_0_string": "4.73 ug/m3",
                "pm1_0_value": 4.73,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.73 ug/m3",
                "pm10_value": 4.73,
                "pm10_uom": "ug/m3",
                "no2_string": "58.66 ug/m3",
                "no2_value": 58.66,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.04,
                "pm2_5_string": "3.04 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 62.92,
                "o3_string": "62.92 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T08:20:31Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7319",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7319,
                "pm1_0_string": "4.29 ug/m3",
                "pm1_0_value": 4.29,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.29 ug/m3",
                "pm10_value": 4.29,
                "pm10_uom": "ug/m3",
                "no2_string": "61.1 ug/m3",
                "no2_value": 61.1,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.32,
                "pm2_5_string": "3.32 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 65.66,
                "o3_string": "65.66 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T08:33:22Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7324",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7324,
                "pm1_0_string": "4.32 ug/m3",
                "pm1_0_value": 4.32,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.32 ug/m3",
                "pm10_value": 4.32,
                "pm10_uom": "ug/m3",
                "no2_string": "55.46 ug/m3",
                "no2_value": 55.46,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.92,
                "pm2_5_string": "3.92 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 59.58,
                "o3_string": "59.58 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T08:52:38Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7328",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7328,
                "pm1_0_string": "4.9 ug/m3",
                "pm1_0_value": 4.9,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.9 ug/m3",
                "pm10_value": 4.9,
                "pm10_uom": "ug/m3",
                "no2_string": "53.96 ug/m3",
                "no2_value": 53.96,
                "no2_uom": "ug/m3",
                "pm2_5_value": 2.8,
                "pm2_5_string": "2.8 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 59.58,
                "o3_string": "59.58 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T09:05:29Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7333",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7333,
                "pm1_0_string": "4.35 ug/m3",
                "pm1_0_value": 4.35,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.35 ug/m3",
                "pm10_value": 4.35,
                "pm10_uom": "ug/m3",
                "no2_string": "59.78 ug/m3",
                "no2_value": 59.78,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.75,
                "pm2_5_string": "3.75 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 61.94,
                "o3_string": "61.94 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T09:18:20Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        },
        {
            "type": "Feature",
            "id": "a_sentilo_airquality.7337",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": [
                    [
                        -28911.89814883,
                        4744570.24095592
                    ]
                ]
            },
            "geometry_name": "wkb_geometry",
            "properties": {
                "ogc_fid": 7337,
                "pm1_0_string": "4.16 ug/m3",
                "pm1_0_value": 4.16,
                "pm1_0_uom": "ug/m3",
                "pm10_string": "4.16 ug/m3",
                "pm10_value": 4.16,
                "pm10_uom": "ug/m3",
                "no2_string": "60.91 ug/m3",
                "no2_value": 60.91,
                "no2_uom": "ug/m3",
                "pm2_5_value": 3.02,
                "pm2_5_string": "3.02 ug/m3",
                "pm2_5_uom": "ug/m3",
                "o3_value": 63.7,
                "o3_string": "63.7 ug/m3",
                "o3_uom": "ug/m3",
                "observation_time": "2024-03-20T09:31:11Z",
                "component": "CUACTMC02",
                "modified_by": None,
                "last_modification": None,
                "feat_date_gvol": "2024-03-20T11:09:45.918Z",
                "feat_version_gvol": 1
            }
        }
    ],
    "totalFeatures": "unknown",
    "numberReturned": 40,
    "timeStamp": "2024-03-20T11:19:56.282Z",
    "crs": {
        "type": "name",
        "properties": {
            "name": "urn:ogc:def:crs:EPSG::3857"
        }
    }
}

def parse_datetime(s):
    try:
        return datetime.strptime(s, "%Y-%m-%dT%H:%M:%SZ")
    except ValueError:
        try:
            return datetime.strptime(s, "%Y-%m-%dT%H:%M:%S.%fZ")
        except Exception as e:
            return None

average_feature = {}
average_numeric_value = 0
numeric_keys = set()
average_values = {}
average_string_values = {}
dates_array = {}
for feature in data["features"]:

    for key in feature["properties"].keys():
        
        if  isinstance(feature["properties"][key], (int, float)) and key not in ["ogc_fid","feat_version_gvol"]:
            numeric_keys.add(key)
        if isinstance(feature["properties"][key], str) and parse_datetime(feature["properties"][key]) is not None:

            #parse date and add to array 
            if key not in dates_array:
                dates_array[key] = []
            dates_array[key].append(parse_datetime(feature["properties"][key]))
        if isinstance(feature["properties"][key], date):
            #parse date and add to array 
            if key not in dates_array:
                dates_array[key] = []
            dates_array[key].append(parse_datetime(feature["properties"][key]))

date_object = {}
for key in dates_array.keys():
    date_object[key] = max(dates_array[key])

for key in numeric_keys:
    filtered_features = list(filter(lambda feature: isinstance(feature["properties"][key], (int, float)), data["features"]))
    average_value = sum([
                                feature["properties"][key] 
                                    for feature in filtered_features 
                                ])/len(filtered_features)
    average_values[key] = average_value
    bae_property_name = key.split("_value")[0]
    uom_key = bae_property_name + "_uom"
    try:
        uom = feature["properties"][uom_key]
        average_string_values[bae_property_name + "_string"] = str(average_value) + " " + uom
    except: 
        print(f"UOM not found for {key}")

value_to_return = data["features"][0]
for key in value_to_return:
    if key in average_values:
        value_to_return[key] = average_values[key]
    if key in average_string_values:
        value_to_return[key] = average_string_values[key]
    if key in date_object:
        value_to_return[key] = date_object[key]

pprint.pprint(value_to_return)

