inputs = `
<div style="margin-left:10px;margin-top:10px">	
    <span class="text" style="vertical-align: super;margin-left:10px"> ${gettext('Show values')}:</span>
</div>

<div style="margin-left:10px;">
    <input type="radio" id="temporary-all" data-value="all" name="temporary-group-show-values" checked>
    <span class="text" style="vertical-align: super;margin-left:10px">${gettext('All')}</span>
</div>

<div style="margin-left:10px;">
    <input type="radio" id="temporary-average" data-value="average" name="temporary-group-show-values">
    <span class="text" style="vertical-align: super;margin-left:10px">${gettext('Average')}</span>
</div>

<div style="margin-left:10px;">
    <input type="radio" id="temporary-last" data-value="last" name="temporary-group-show-values">
    <span class="text" style="vertical-align: super;margin-left:10px">${gettext('Last')}</span>
</div>`

$("#temporary-panel > .temporary-body").append(inputs)
var all = true;
var mean = false;
var last = false;
$("input[name=temporary-group-show-values]").change(function (e) {
    value = $(e.target).attr("data-value");
    all = value == "all";
    mean = value == "average";
    last = value == "last";
});
const mapFeaturesToLastValue = (data, time_field) => {
    datesArray = data.map(d => new Date(d.feature.properties[time_field]))
    maxDate = Math.max(...datesArray)
    maxDateFeature = data.filter(d => new Date(d.feature.properties[time_field]) >= maxDate)
    return maxDateFeature
}

function mapFeaturesToMeanValue(data, timeField) {
    if (data.length <= 1) {
        return data;
    }

    const numericKeys = new Set();
    const averageValues = {};
    const averageStringValues = {};

    // Identify numeric keys
    data.forEach(feature => {
        Object.keys(feature.feature.properties).forEach(key => {
            if ((typeof feature.feature.properties[key] === 'number') && !['ogc_fid', 'feat_version_gvol'].includes(key)) {
                numericKeys.add(key);
            }
        });
    });

    // Calculate average values for numeric keys
    numericKeys.forEach(key => {
        const filteredFeatures = data.filter(feature => typeof feature.feature.properties[key] === 'number');
        const averageValue = filteredFeatures.reduce((acc, feature) => acc + feature.feature.properties[key], 0) / filteredFeatures.length;
        averageValues[key] = averageValue;

        const basePropertyName = key.split('_value')[0];
        const uomKey = basePropertyName + '_uom';
        try {
            const uom = filteredFeatures[filteredFeatures.length - 1].feature.properties[uomKey]; // Assuming the last feature has the unit of measurement
            averageStringValues[basePropertyName + '_string'] = `${averageValue.toFixed(2)} ${uom}`;
        } catch (error) {
            console.log(`UOM not found for ${key}`);
        }
    });

    const valueToReturn = mapFeaturesToLastValue(data, timeField)[0];

    Object.keys(valueToReturn.feature.properties).forEach(key => {
        if (key in averageValues) {
            valueToReturn.feature.properties[key] = averageValues[key];
        }
        if (key in averageStringValues) {
            valueToReturn.feature.properties[key] = averageStringValues[key];
        }
    });

    return [valueToReturn];
}


originalRef = getFeatureInfo.prototype.appendInfo;
getFeatureInfo.prototype.appendInfo = function (features, count) {
    console.log(count, features[0]);
    let featuresArray = features.length == 0 ? [] : [features[0]];
    let tempCount = featuresArray.length;
    if (all) {
        featuresArray = features;
        tempCount = count
    } else {
        let allLayers = [];

        for (group of viewer.core.getConf().layerGroups) {
            allLayers = allLayers.concat(group.layers)
        }

        layerNames = [];
        for (feature of features) {
            layerNames.push(feature.layer.layer_name)
        }
        layerNames = new Set(layerNames)

        featuresArray = [];
        for (layerName of layerNames) {
            const layer = allLayers.find(layer => layer.name == layerName)
            const layerFeatures = features.filter(feature => feature.layer.layer_name == layerName)

            if (!layer.time_enabled) {
                featuresArray = featuresArray.concat(layerFeatures);
            } else {
                const timeEnabledField = layer.time_enabled_field;
                if (mean) {
                    featuresArray = mapFeaturesToMeanValue(features, timeEnabledField);
                } else if (last) {
                    console.log(layer, layerFeatures)
                    featuresArray = mapFeaturesToLastValue(features, timeEnabledField);
                }
                tempCount = featuresArray.length;

            }

        }

    }
    originalRef.apply(this, [featuresArray, tempCount])
}