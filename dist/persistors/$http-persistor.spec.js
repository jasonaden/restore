"use strict";
var _http_persistor_1 = require('./$http-persistor');
var _http_persistor_config_1 = require('./$http-persistor-config');
var caseEmbedded_1 = require('../mocks/caseEmbedded');
var caseList_1 = require('../mocks/caseList');
describe('$httpPersistor', function () {
    var $httpBackend;
    var $rootScope;
    var ConfigClass = _http_persistor_config_1.$httpPersistorConfig;
    var config;
    var PersistorClass = _http_persistor_1.$httpPersistor;
    var persistor;
    var $q;
    var prom;
    beforeEach(angular.mock.module('Restore'));
    beforeEach(inject(function (_$httpBackend_, _$rootScope_, _$httpPersistor_, _$q_) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $q = _$q_;
        persistor = new _$httpPersistor_();
        config = new _http_persistor_config_1.$httpPersistorConfig();
    }));
    describe('should have static methods', function () {
        it('to set config', function () {
            expect(typeof PersistorClass.setConfig).toEqual('function');
        });
        it('to get the config', function () {
            expect(typeof PersistorClass.getConfig).toEqual('function');
            expect(PersistorClass.getConfig()).toEqual(config);
        });
        it('to set a default static config with the static setConfig method', function () {
            var configNew = new _http_persistor_config_1.$httpPersistorConfig();
            configNew.method = "PUT";
            PersistorClass.setConfig(configNew);
            expect(PersistorClass.getConfig().method).toEqual('PUT');
            // need to set it back since there is only one class and changing
            //  the class default affects the rest of the tests
            configNew.method = "GET";
            PersistorClass.setConfig(configNew);
            expect(PersistorClass.getConfig().method).toEqual('GET');
        });
        it('to set the $http service', function () {
            expect(typeof PersistorClass.setHttp).toEqual('function');
            expect(typeof PersistorClass.getHttp()).toEqual('function');
        });
        it('to set the $q service', function () {
            expect(typeof PersistorClass.setQ).toEqual('function');
            expect(typeof PersistorClass.getQ).toEqual('function');
        });
    });
    describe('should have instance methods: ', function () {
        var methods = ['setConfig', 'execute', 'doRequest', 'findOne'];
        it(methods.join(','), function () {
            methods.forEach(function (item) {
                expect(typeof persistor[item]).toEqual('function');
            });
        });
    });
    describe('should be able to override the default configuration', function () {
        it('in the constructor', function () {
            // make a new config
            var newConfig = new _http_persistor_config_1.$httpPersistorConfig();
            newConfig.method = 'PUT';
            // verify the default persistor has the default config
            expect(persistor.getConfig().method).toEqual('GET');
            var newPersistor = new _http_persistor_1.$httpPersistor(newConfig);
            expect(newPersistor.getConfig().method).toEqual('PUT');
        });
        it('by calling the instance setConfig method', function () {
            // verify default persistor has the default config
            expect(persistor.getConfig().method).toEqual('GET');
            persistor.setConfig({ method: "PATCH" });
            expect(persistor.getConfig().method).toEqual('PATCH');
        });
        // Can also override the config when calling persistor.execute -- 
        //  see tests below where that is done.
    });
    // HERE 
    describe('execute method', function () {
        beforeEach(function () {
            persistor.setConfig({
                url: '/foo/{{@id}}'
            });
            prom = $q.when(1);
        });
        it('should return a promise', function () {
            var localConfig = {
                data: { id: 13 }
            };
            $httpBackend.expectGET('/foo/13').respond(200, { me: 'too' });
            var ret = persistor.execute(localConfig);
            // a little hokey in terms of getting the Promise to verify the 
            //  type, hopefully will come across a better way to do it.  
            expect(ret instanceof prom.constructor).toBeTruthy();
        });
        it('should return data for a case as it was received from the server', function (done) {
            var localConfig = {
                data: { id: 13 }
            };
            $httpBackend.expectGET('/foo/13').respond(200, caseEmbedded_1.caseEmbedded);
            persistor.execute(localConfig)
                .then(function (response) {
                expect(response.data).toEqual(caseEmbedded_1.caseEmbedded);
                done();
            });
            $httpBackend.flush();
        });
        it('should return an object that contains an array of data as it was received from the server', function (done) {
            $httpBackend.expectGET('/foo').respond(200, caseList_1.caseList);
            persistor.execute()
                .then(function (response) {
                expect(response.data).toEqual(caseList_1.caseList);
                done();
            });
            $httpBackend.flush();
        });
    });
    describe('makes GET requests', function () {
        beforeEach(function () {
            persistor.setConfig({
                url: '/foo/{{@id}}'
            });
        });
        it('it should use the default GET method', function () {
            $httpBackend.expectGET('/foo').respond(200);
            persistor.execute();
            $httpBackend.flush();
        });
        it('should support dynamic URLs', function () {
            var localConfig = { data: { id: 1 } };
            $httpBackend.expectGET('/foo/1').respond(200);
            persistor.execute(localConfig);
            $httpBackend.flush();
        });
        it('should add params to the query string', function () {
            var localConfig = {
                data: { id: 1 },
                params: { order: 'desc' }
            };
            $httpBackend.expectGET('/foo/1?order=desc').respond(200);
            persistor.execute(localConfig);
            $httpBackend.flush();
        });
    }); // makes GET requests
    describe('makes POST requests', function () {
        var localConfig;
        beforeEach(function () {
            persistor.setConfig({
                url: '/foo/{{@id}}',
                method: 'POST',
                data: { name: 'Mr. Bean' }
            });
        });
        it('POSTs the data in data property', function () {
            $httpBackend.expectPOST('/foo', { name: 'Mr. Bean' }).respond(201);
            persistor.execute();
            $httpBackend.flush();
        });
        it('drops ID param on POST even if it exists in data prop', function () {
            var localConfig = { data: { id: 1 } };
            $httpBackend.expectPOST('/foo').respond(201);
            persistor.execute(localConfig);
            $httpBackend.flush();
        });
        it('adds params to query string', function () {
            var localConfig = { params: { order: 'desc' } };
            $httpBackend.expectPOST('/foo?order=desc').respond(201);
            persistor.execute(localConfig);
            $httpBackend.flush();
        });
    }); // makes POST requests
    describe('makes PUT & PATCH requests', function () {
        beforeEach(function () {
            persistor.setConfig({
                url: '/foo/{{@id}}',
                method: 'PUT',
                data: {
                    id: 101,
                    subject: "Updated Item"
                }
            });
        });
        it('PUTs & PATCHes the data in data property', function () {
            // PUT
            $httpBackend.expectPUT('/foo/101').respond(200);
            persistor.execute();
            $httpBackend.flush();
            // PATCH
            $httpBackend.expectPATCH('/foo/101').respond(200);
            // reset method in execute
            persistor.execute({ method: 'PATCH' });
            $httpBackend.flush();
        });
        it('adds params to query string', function () {
            var localConfig = {
                params: { order: 'desc' },
                method: 'PUT'
            };
            // PUT
            $httpBackend.expectPUT('/foo/101?order=desc').respond(200);
            persistor.execute(localConfig);
            $httpBackend.flush();
            // PATCH
            $httpBackend.expectPATCH('/foo/101?order=desc').respond(200);
            localConfig.method = 'PATCH';
            persistor.execute(localConfig);
            $httpBackend.flush();
        });
    }); // makes PUT requests
    describe('performs transformations', function () {
        it('on a response', function () {
            persistor.setConfig({
                url: '/foo/bar',
                method: 'GET',
                transformResponse: function (response) {
                    response.name = 'Mr. ' + response.name;
                    return response;
                }
            });
            $httpBackend.whenGET(config.url).respond(200, { name: 'Smith' });
            persistor.execute().then(function (response) {
                expect(response.data.name).toBe('Mr. Smith');
            });
            $httpBackend.flush();
        });
        it('on  a request', function () {
            persistor.setConfig({
                url: '/foo/bar',
                method: 'POST',
                data: { name: 'Jones' },
                transformRequest: function (request) {
                    request.name = 'Mr. ' + request.name;
                    request.foo = 'bar';
                    return request;
                }
            });
            $httpBackend.expectPOST(config.url, { name: 'Mr. Jones', foo: 'bar' }).respond(200);
            persistor.execute();
            $httpBackend.flush();
        });
    }); // performs transformations
    // 7/28/16: daden: not running this because interceptors not currently 
    //  implemented. See notes in generate-http-config.ts
    xdescribe('allows custom interceptors', function () {
        beforeEach(function () {
            persistor.setConfig({
                method: 'GET',
                url: '/foo/bar'
            });
        });
        it('allows custom interceptors for a response', function () {
            var response = null;
            config = config.extend({
                interceptors: {
                    response: function (response) {
                        console.log("doing the response", response);
                        response.data.name = 'Mr. ' + response.data.name;
                        return response;
                    }
                }
            });
            $httpBackend.whenGET(config.url).respond(200, { name: 'Smith' });
            persistor.execute().then(function (res) {
                response = res.data;
            });
            $httpBackend.flush();
            expect(response).toEqual({ name: 'Mr. Smith' });
        });
        it('allows custom interceptors for a response error', function () {
            var error = null;
            var errorResponse = 'Error!';
            config = config.extend({
                interceptors: {
                    responseError: function (rejection) {
                        rejection.data = errorResponse;
                        return $q.reject(rejection);
                    }
                }
            });
            $httpBackend.whenGET(config.url).respond(500);
            persistor.execute(config).catch(function (err) {
                error = err.data;
            });
            $httpBackend.flush();
            expect(error).toEqual(errorResponse);
        });
    }); // allows custom interceptors
});
