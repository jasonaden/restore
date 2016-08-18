"use strict";
var BasePersistor = (function () {
    function BasePersistor() {
    }
    BasePersistor.prototype.create = function (data, options) {
        data = Object.assign({}, data, { created: true });
        return Promise.resolve(this.toJSON(data));
    };
    // update (data, options?, base?): ng.IPromise<any> {
    BasePersistor.prototype.update = function (data, options, base) {
        data = Object.assign({}, data, { updated: true });
        return Promise.resolve(data);
    };
    BasePersistor.prototype.findOne = function (options) {
        // Do some work to get data and then resolve it
        return Promise.all([{ id: 123 }]);
    };
    BasePersistor.prototype.find = function (options) {
        return Promise.resolve([{ id: 123 }, { id: 456 }]);
    };
    BasePersistor.prototype.destroy = function (params) {
        return Promise.resolve(undefined);
    };
    /**
     * Default reviver. This function will run when sending back a response such as after
     * find or findOne, but before the `afterAction` hooks get a hold of the data.
     */
    BasePersistor.prototype.reviver = function (key, value) {
        return value;
    };
    /**
     * Convert payload to JSON format
     */
    BasePersistor.prototype.toJSON = function (value) {
        if (!value || Array.isArray(value) || typeof value !== 'object')
            return value;
        var ret = Object.assign({}, value);
        // Remove internal "$" properties
        for (var x in ret) {
            if (ret.hasOwnProperty(x) && x[0] === '$')
                delete ret[x];
        }
        return ret;
    };
    /**
     * Convert payload from JSON format
     */
    BasePersistor.prototype.fromJSON = function (value) {
        if (typeof value !== 'string')
            return value;
        return JSON.parse(value, this.reviver);
    };
    return BasePersistor;
}());
exports.BasePersistor = BasePersistor;
