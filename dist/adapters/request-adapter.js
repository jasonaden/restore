"use strict";
var request = require('request');
var utils_1 = require('../utils');
var configDefaults = {
    baseUrl: "/",
    removeTrailingSlash: true,
    datePattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
};
/*
* Request-based adapter for an API.
*/
var RequestAdapter = (function () {
    function RequestAdapter(_a) {
        var _b = _a.baseUrl, baseUrl = _b === void 0 ? configDefaults.baseUrl : _b, removeTrailingSlash = _a.removeTrailingSlash, datePattern = _a.datePattern;
        this.baseUrl;
        if (!this.interceptors) {
            this.interceptors = [];
        }
    }
    RequestAdapter.prototype.generateSlug = function (entity) {
        return entity.id;
    };
    // Execute request based on given DsResourceAdapterConfig
    RequestAdapter.prototype.execute = function (config) {
        var requestConfig = this.config.extend(config).build();
        return this.doRequest(requestConfig);
    };
    // Default reviver (override this)
    RequestAdapter.prototype.reviver = function (key, value) {
        return value;
    };
    RequestAdapter.prototype.doRequest = function (config) {
        var _this = this;
        return utils_1.generateConfig(this.$q, this, config)
            .then(function (config) { return _this.$http(config)
            .then(config.interceptor.response, config.interceptor.responseError); });
    };
    // Default response transform
    RequestAdapter.prototype.transformResponse = function (data, headers) {
        return utils_1.parseJson(this.datePattern, this.reviver, data, headers);
    };
    // Default request transform
    RequestAdapter.prototype.transformRequest = function (data, headers) {
        return JSON.stringify(data, function (key, value) {
            if (['@viewModel', '@descriptor'].indexOf(key) == -1) {
                return value;
            }
        });
    };
    RequestAdapter.prototype.find = function (config, params) {
        request;
    };
    RequestAdapter.prototype.findOne = function () {
    };
    RequestAdapter.prototype.create = function () {
    };
    RequestAdapter.prototype.update = function () {
    };
    RequestAdapter.prototype.destroy = function () {
    };
    return RequestAdapter;
}());
exports.RequestAdapter = RequestAdapter;
