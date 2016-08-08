// TODO: This file should probably be renamed. Maybe like "angular-exporter" or 
// something like that. The idea is it's a file that can be used to wire in 
// various pieces of this library to Angular.
"use strict";
var _http_persistor_1 = require('./persistors/$http-persistor');
var angular = require('angular');
exports.RestoreModule = angular.module('Restore', [])
    .provider('$httpPersistor', function () {
    return {
        $get: function ($http, $q) {
            _http_persistor_1.$httpPersistor.setHttp($http);
            _http_persistor_1.$httpPersistor.setQ($q);
            return _http_persistor_1.$httpPersistor;
        }
    };
});
// .service('$httpPersistor', $httpPersistor);
exports.Restore = "Restore";
