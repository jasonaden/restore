"use strict";
var resource_adapter_1 = require('./resource-adapter');
var resource_adapter_config_1 = require('./resource-adapter-config');
require('angular-mocks');
var $httpBackend;
var $q;
var $http;
var adapter;
var config;
describe('ResourceAdapter', function () {
    beforeEach(inject(function (_$http_, _$httpBackend_, _$q_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        adapter = new resource_adapter_1.ResourceAdapter($http, $q);
        config = new resource_adapter_config_1.ResourceAdapterConfig({});
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    xdescribe('execute', function () {
        it('runs ResourceAdapterConfig.build()', function () {
            // This test should work, but doesn't because spyOn causes an error to be thrown
            // spyOn(config, 'build');
            // $httpBackend.whenGET(config.url).respond(200);
            // adapter.execute(config);
            // $httpBackend.flush();
            // expect(config.build).toHaveBeenCalled();
        });
    });
    describe('makes GET requests', function () {
        beforeEach(function () {
            config = config.extend({
                url: '/foo/{{@id}}',
                method: 'GET'
            });
        });
        it('to listing URLs', function () {
            $httpBackend.expectGET('/foo').respond(200);
            adapter.execute(config);
            $httpBackend.flush();
        });
        it('to item URLs', function () {
            config = config.extend({ data: {
                    id: 1
                } });
            $httpBackend.expectGET('/foo/1').respond(200);
            adapter.execute(config);
            $httpBackend.flush();
        });
        it('adds params to query string', function () {
            config = config.extend({
                data: { id: 1 },
                params: { order: 'desc' }
            });
            $httpBackend.expectGET('/foo/1?order=desc').respond(200);
            adapter.execute(config);
            $httpBackend.flush();
        });
    }); // makes GET requests
    describe('makes POST requests', function () {
        beforeEach(function () {
            config = config.extend({
                url: '/foo/{{@id}}',
                method: 'POST',
                data: {
                    subject: "New Item"
                }
            });
        });
        it('POSTs the data in data property', function () {
            $httpBackend.expectPOST('/foo').respond(201);
            adapter.execute(config);
            $httpBackend.flush();
        });
        it('drops ID param on POST even if it exists in data prop', function () {
            config = config.extend({
                data: {
                    id: 1,
                    subject: "New Item"
                }
            });
            $httpBackend.expectPOST('/foo').respond(201);
            adapter.execute(config);
            $httpBackend.flush();
        });
        it('adds params to query string', function () {
            config = config.extend({
                params: { order: 'desc' }
            });
            $httpBackend.expectPOST('/foo?order=desc').respond(201);
            adapter.execute(config);
            $httpBackend.flush();
        });
    }); // makes POST requests
    describe('makes PUT & PATCH requests', function () {
        beforeEach(function () {
            config = config.extend({
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
            adapter.execute(config);
            $httpBackend.flush();
            // PATCH
            $httpBackend.expectPATCH('/foo/101').respond(200);
            config = config.extend({ method: 'PATCH' });
            adapter.execute(config);
            $httpBackend.flush();
        });
        it('adds params to query string', function () {
            config = config.extend({
                params: { order: 'desc' }
            });
            // PUT
            $httpBackend.expectPUT('/foo/101?order=desc').respond(200);
            adapter.execute(config);
            $httpBackend.flush();
            // PATCH
            $httpBackend.expectPATCH('/foo/101?order=desc').respond(200);
            config = config.extend({ method: 'PATCH' });
            adapter.execute(config);
            $httpBackend.flush();
        });
    }); // makes PUT requests
    describe('performs transformations', function () {
        beforeEach(function () {
            config = config.extend({
                method: 'GET',
                url: '/foo/bar'
            });
        });
        it('on a response', function () {
            config = config.extend({
                transformResponse: function (response) {
                    response.name = 'Mr. ' + response.name;
                    return response;
                }
            });
            $httpBackend.whenGET(config.url).respond(200, { name: 'Smith' });
            adapter.execute(config).then(function (response) {
                expect(response.data.name).toBe('Mr. Smith');
            });
            $httpBackend.flush();
        });
        it('on  a request', function () {
            config = config.extend({
                method: 'POST',
                data: { name: 'Smith' },
                transformRequest: function (request) {
                    var data = JSON.parse(request);
                    data.name = 'Mr. ' + data.name;
                    return data;
                }
            });
            $httpBackend.expectPOST(config.url, { name: 'Mr. Smith' }).respond(200);
            adapter.execute(config);
            $httpBackend.flush();
        });
    }); // performs transformations
    describe('allows custom interceptors', function () {
        beforeEach(function () {
            config = config.extend({
                method: 'GET',
                url: '/foo/bar'
            });
        });
        it('allows custom interceptors for a response', function () {
            var response = null;
            config = config.extend({
                interceptors: {
                    response: function (cfg) {
                        cfg.data.name = 'Mr. ' + cfg.data.name;
                        return cfg;
                    }
                }
            });
            $httpBackend.whenGET(config.url).respond(200, { name: 'Smith' });
            adapter.execute(config).then(function (res) {
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
            adapter.execute(config).catch(function (err) {
                error = err.data;
            });
            $httpBackend.flush();
            expect(error).toEqual(errorResponse);
        });
    }); // allows custom interceptors
});
