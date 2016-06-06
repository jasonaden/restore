"use strict";
var resource_adapter_1 = require('../resources/resource-adapter');
var utils_1 = require('../utils');
var $http;
var $q;
var adapter;
var config;
var $rootScope;
describe('generateConfig', function () {
    beforeEach(inject(function (_$http_, _$httpBackend_, _$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        adapter = new resource_adapter_1.ResourceAdapter($http, $q);
        config = {
            method: 'GET',
            url: '/foo/bar'
        };
    }));
    it('is defined', function () {
        expect(utils_1.generateConfig).toBeDefined();
    });
    it('returns a promise', function () {
        var request = utils_1.generateConfig($q, adapter, config);
        expect(request.then).toBeDefined();
    });
    it('adds default transforms', function () {
        utils_1.generateConfig($q, adapter, config).then(function (config) {
            expect(config.transformResponse).toBeDefined();
            expect(config.transformRequest).toBeDefined();
        });
        $rootScope.$digest();
    });
    it('sets up default interceptors', function () {
        utils_1.generateConfig($q, adapter, config).then(function (config) {
            expect(config.interceptor.response).toBeDefined();
            expect(config.interceptor.responseError).toBeDefined();
        });
        $rootScope.$digest();
    });
});
