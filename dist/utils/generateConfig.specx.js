// TODO: Work out what to do with this file. It's probably got to be pushed down to 
// the persistence layer. It's Angularized, but doesn't really need to be (I don't think)
"use strict";
var base_adapter_1 = require('../adapters/base-adapter');
var utils_1 = require('../utils');
var normalizr_1 = require('normalizr');
var $http;
var $q;
var adapter;
var config;
var $rootScope;
describe('generateConfig', function () {
    beforeEach(inject(function (_$http_, _$httpBackend_, _$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        var schema = new normalizr_1.Schema('testResource');
        var adapter = new base_adapter_1.BaseAdapter();
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
