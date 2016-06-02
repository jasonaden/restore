"use strict";
var transform_1 = require('./transform');
function parseJson(datePattern, revive, data, headers) {
    if (datePattern === void 0) { datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/; }
    if (revive === void 0) { revive = function (k, v) { return v; }; }
    var reviver = function (key, value) {
        if (typeof value == 'string' && value.match(datePattern)) {
            return new Date(value);
        }
        else {
            return revive.call(this, key, value);
        }
    };
    var data;
    if (typeof data === 'string') {
        data = JSON.parse(data, reviver);
    }
    else if (data != null) {
        transform_1.transform(data, reviver);
    }
    return data;
}
exports.parseJson = parseJson;
