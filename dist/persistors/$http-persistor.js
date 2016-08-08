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
    // TODO: this requires an IHttpPersistorConfig but 
    //  this.setConfig() takes anything -- should these be consistent?  
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
    $httpPersistor.setConfig = function (config) {
        $httpPersistor.config = config;
    };
    $httpPersistor.getConfig = function () {
        return $httpPersistor.config;
    };
    // instance method 
    $httpPersistor.prototype.setConfig = function (config) {
        this.config = $httpPersistor.config.extend(config);
    };
    $httpPersistor.prototype.getConfig = function () {
        return this.config;
    };
    // Execute request based on the existing config and any new config. 
    $httpPersistor.prototype.execute = function (config) {
        var requestConfig = this.config.extend(config).build();
        return this.doRequest(requestConfig);
    };
    $httpPersistor.prototype.doRequest = function (config) {
        return generate_http_config_1.generateHttpConfig($httpPersistor.$q, config)
            .then(function (config) {
            return $httpPersistor.$http(config);
        });
        // .then( (ret) => {
        //   console.log("$http-persistor doRequest", ret)
        // })
    };
    /*
    doRequest_orig (config: IHttpPersistorConfig): ng.IPromise<any> {
      return generateHttpConfig($httpPersistor.$q, this, config)
      .then(config => $httpPersistor.$http(config)
        .then(config.interceptor.response, config.interceptor.responseError)
      );
    }
    */
    // TODO: I added the function return to avoid a TS error, but it
    //  is not probably not actually returning a Promise as this
    //  persistor is not in use. 
    $httpPersistor.prototype.findOne = function (data) {
        var config = {
            method: 'GET',
            type: data.type,
            id: data.id
        };
        return this.execute(config);
    };
    $httpPersistor.config = new _http_persistor_config_1.$httpPersistorConfig();
    return $httpPersistor;
}(base_persistor_1.BasePersistor));
exports.$httpPersistor = $httpPersistor;
