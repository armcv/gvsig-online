from datetime import datetime, date
from urllib.parse import urlparse, parse_qs

def parse_datetime(s):
    try:
        return datetime.strptime(s, "%Y-%m-%dT%H:%M:%SZ")
    except ValueError:
        try:
            return datetime.strptime(s, "%Y-%m-%dT%H:%M:%S.%fZ")
        except Exception as e:
            return None

def map_features_to_last_value(data, time_field):
    dates_array = [parse_datetime(d["properties"][time_field]) for d in data]
    max_date = max(dates_array)
    max_date_feature = list(filter(lambda x: parse_datetime(x["properties"][time_field]) >= max_date, data))
    return max_date_feature


def map_features_to_mean_value(data, time_field):
    if len(data) <= 1:
        return data
    numeric_keys = set()
    average_values = {}
    average_string_values = {}
    for feature in data:
        for key in feature["properties"].keys():
            if  isinstance(feature["properties"][key], (int, float)) and key not in ["ogc_fid","feat_version_gvol"]:
                numeric_keys.add(key)

    for key in numeric_keys:
        filtered_features = list(filter(lambda feature: isinstance(feature["properties"][key], (int, float)), data))
        average_value = sum([
                                    feature["properties"][key] 
                                        for feature in filtered_features 
                                    ])/len(filtered_features)
        average_values[key] = average_value
        bae_property_name = key.split("_value")[0]
        uom_key = bae_property_name + "_uom"
        try:
            uom = feature["properties"][uom_key]
            average_string_values[bae_property_name + "_string"] = str(round(average_value,2)) + " " + uom
        except: 
            print(f"UOM not found for {key}")
    value_to_return = map_features_to_last_value(data, time_field)[0]
    for key in value_to_return["properties"].keys():
        if key in average_values.keys():
            value_to_return["properties"][key] = average_values[key]
        if key in average_string_values.keys():
            value_to_return["properties"][key] = average_string_values[key]
    return [value_to_return]

def get_response_features(url, full_features, layer_time_enabled_field):
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    show_value = query_params.get('SHOW_VALUES', [''])[0]
    time_enabled_field = layer_time_enabled_field
    if show_value == 'average':
        response_features  = map_features_to_mean_value(full_features, time_enabled_field)
    elif show_value == 'last':
        response_features  = map_features_to_last_value(full_features, time_enabled_field)
    else:
        response_features = full_features
    return response_features