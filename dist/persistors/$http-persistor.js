"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_persistor_1 = require('./base-persistor');
var _http_persistor_config_1 = require('./$http-persistor-config');
var generate_http_config_1 = require('./generate-http-config');
/*
* $http-based persistence layer.
*/
var $httpPersistor = (function (_super) {
    __extends($httpPersistor, _super);
    // Set the instance config based on static config and what's passed in
    function $httpPersistor(config) {
        _super.call(this);
        this.config = $httpPersistor.config.extend(config);
    }
    $httpPersistor.setHttp = function ($http) {
        $httpPersistor.$http = $http;
    };
    $httpPersistor.getHttp = function () {
        return $httpPersistor.$http;
    };
    $httpPersistor.setQ = function ($q) {
        $httpPersistor.$q = $q;
    };
    $httpPersistor.getQ = function () {
        return $httpPersistor.$q;
    };
    // Running this static method only makes a difference before 
    //  instantiation
    $httpPersistor.setConfig = function (config) {
        $httpPersistor.config = config;
    };
    $httpPersistor.getConfig = function () {
        return $httpPersistor.config;
    };
    // instance methods 
    // Originally, this overrode the instance config set in the constructor
    // 8/9/16: Changed this to build on the instance config set in the 
    //  constructor instead of overriding it. 
    $httpPersistor.prototype.setConfig = function (config) {
        // this.config = $httpPersistor.config.extend(config);
        this.config = this.config.extend(config);
    };
    $httpPersistor.prototype.getConfig = function () {
        return this.config;
    };
    // Execute request based on the existing config and 
    //  object passed in that overrides the existing config.  
    // execute (config?: any): ng.IPromise<any> {
    $httpPersistor.prototype.execute = function (config) {
        var requestConfig = this.config.extend(config).build();
        return this.doRequest(requestConfig);
    };
    $httpPersistor.prototype.doRequest = function (requestConfig) {
        return generate_http_config_1.generateHttpConfig($httpPersistor.$q, requestConfig)
            .then(function (httpConfig) {
            return $httpPersistor.$http(httpConfig);
        });
    };
    /*
    doRequest_orig (config: IHttpPersistorConfig): ng.IPromise<any> {
      return generateHttpConfig($httpPersistor.$q, this, config)
      .then(config => $httpPersistor.$http(config)
        .then(config.interceptor.response, config.interceptor.responseError)
      );
    }
    */
    $httpPersistor.prototype.findOne = function (config) {
        if (!(config.id && config.className)) {
            return $httpPersistor.$q.reject("persistor findOne requires className and id");
        }
        return this.execute(config);
    };
    $httpPersistor.prototype.find = function (config) {
        config.method = config.method || 'GET';
        config.className = config.className || 'case';
        debugger;
        return this.execute(config);
    };
    // sets the static config
    $httpPersistor.config = new _http_persistor_config_1.$httpPersistorConfig();
    return $httpPersistor;
}(base_persistor_1.BasePersistor));
exports.$httpPersistor = $httpPersistor;
