"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Resource class
var resource_1 = require('./resources/resource');
exports.Resource = resource_1.Resource;
// resource reducer
var resource_reducer_1 = require('./reducers/resource-reducer');
exports.defaultReducer = resource_reducer_1.defaultReducer;
// resource-list reducer
var resource_list_reducer_1 = require('./reducers/resource-list-reducer');
exports.defaultListReducer = resource_list_reducer_1.defaultListReducer;
var resource_generic_list_reducer_1 = require('./reducers/resource-generic-list-reducer');
exports.defaultGenericListReducer = resource_generic_list_reducer_1.defaultGenericListReducer;
var resource_generic_reducer_1 = require('./reducers/resource-generic-reducer');
exports.defaultGenericReducer = resource_generic_reducer_1.defaultGenericReducer;
// base adapter
var base_adapter_1 = require('./adapters/base-adapter');
exports.BaseAdapter = base_adapter_1.BaseAdapter;
// $http sample persistor
var _http_persistor_1 = require('./persistors/$http-persistor');
exports.$httpPersistor = _http_persistor_1.$httpPersistor;
var _http_persistor_config_1 = require('./persistors/$http-persistor-config');
exports.$httpPersistorConfig = _http_persistor_config_1.$httpPersistorConfig;
// utils
var utils_1 = require('./utils');
exports.flattenEmbedded = utils_1.flattenEmbedded;
exports.generateConfig = utils_1.generateConfig;
exports.joinUrl = utils_1.joinUrl;
exports.parseJson = utils_1.parseJson;
exports.transform = utils_1.transform;
__export(require('./resources/constants'));
