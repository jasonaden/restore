"use strict";
var utils_1 = require('../utils');
var resource_adapter_config_1 = require('./resource-adapter-config');
/*
* Base Adapter for an API. The adapter handles
*/
var ResourceAdapter = (function () {
    function ResourceAdapter($http, $q, config) {
        if (config === void 0) { config = new resource_adapter_config_1.ResourceAdapterConfig(); }
        this.$http = $http;
        this.$q = $q;
        this.config = config;
        // Base URL for the API
        this.baseUrl = "/";
        // Do or don't remove trailing slash 
        this.removeTrailingSlash = true;
        // Date pattern to be used to find dates in returns from the API
        this.datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
        if (!this.interceptors) {
            this.interceptors = [];
        }
    }
    ResourceAdapter.prototype.generateSlug = function (entity) {
        return entity.id;
    };
    // Execute request based on given DsResourceAdapterConfig
    ResourceAdapter.prototype.execute = function (config) {
        var requestConfig = this.config.extend(config).build();
        return this.doRequest(requestConfig);
    };
    // Default reviver (override this)
    ResourceAdapter.prototype.reviver = function (key, value) {
        return value;
    };
    ResourceAdapter.prototype.doRequest = function (config) {
        var _this = this;
        return utils_1.generateConfig(this.$q, this, config)
            .then(function (config) { return _this.$http(config)
            .then(config.interceptor.response, config.interceptor.responseError); });
    };
    // Default response transform
    ResourceAdapter.prototype.transformResponse = function (data, headers) {
        return utils_1.parseJson(this.datePattern, this.reviver, data, headers);
    };
    // Default request transform
    ResourceAdapter.prototype.transformRequest = function (data, headers) {
        return JSON.stringify(data, function (key, value) {
            if (['@viewModel', '@descriptor'].indexOf(key) == -1) {
                return value;
            }
        });
    };
    return ResourceAdapter;
}());
exports.ResourceAdapter = ResourceAdapter;
