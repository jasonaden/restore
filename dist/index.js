"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Resource class
var resource_1 = require('./resources/resource');
exports.Resource = resource_1.Resource;
// resource reducer
var resource_reducer_1 = require('./resources/resource-reducer');
exports.defaultReducer = resource_reducer_1.defaultReducer;
// interfaces
// don't need to export since they will be in .d.ts file?
// resource-adapter
var resource_adapter_1 = require('./resources/resource-adapter');
exports.ResourceAdapter = resource_adapter_1.ResourceAdapter;
// utils
var utils_1 = require('./utils');
exports.flattenEmbedded = utils_1.flattenEmbedded;
exports.generateConfig = utils_1.generateConfig;
exports.joinUrl = utils_1.joinUrl;
exports.parseJson = utils_1.parseJson;
exports.transform = utils_1.transform;
__export(require('./resources/constants'));
