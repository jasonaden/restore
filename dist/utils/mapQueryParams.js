"use strict";
// From DsResourceAdapterConfig
function mapQueryParams(params, queryMap) {
    var key, map, paramsCopy, value;
    if (!(params && queryMap)) {
        return;
    }
    paramsCopy = {};
    for (key in params) {
        value = params[key];
        if (map = queryMap[key]) {
            switch (typeof map) {
                case 'string':
                    paramsCopy[map] = value;
                    break;
                case 'function':
                    Object.assign(paramsCopy, map(value));
            }
        }
        else {
            paramsCopy[key] = value;
        }
    }
    return paramsCopy;
}
exports.mapQueryParams = mapQueryParams;
