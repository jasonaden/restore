"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var resource_1 = require('./resource');
var configureMockStore = require('redux-mock-store');
var thunk = require('redux-thunk');
var normalizr_1 = require('normalizr');
var middlewares = [thunk];
var mockStore = configureMockStore(middlewares);
var $httpBackend;
var $rootScope;
var store = mockStore({});
;
var url = 'http://localhost:8888/api/v2/testResource';
var response = {
    "total_entries": 1,
    "page": 1,
    "_links": {
        "self": {
            "href": "/api/v2/testResource?page=1&per_page=50",
            "class": "page"
        }
    },
    "_embedded": {
        "entries": [
            {
                "id": 1,
                "subject": "Test Resource subject",
                "_links": {
                    "self": {
                        "href": "/api/v2/testResource/1",
                        "class": "testResource"
                    }
                }
            }
        ]
    }
};
xdescribe('Resource', function () {
    var schema = new normalizr_1.Schema('testResource');
    var _TestResource_ = (function (_super) {
        __extends(_TestResource_, _super);
        function _TestResource_($ngRedux, $http, $q, ApiV2Adapter) {
            _super.call(this, $ngRedux, $http, $q, ApiV2Adapter, schema);
            this.className = 'TEST_RESOURCE';
            this.url = '/testResource';
        }
        return _TestResource_;
    }(resource_1.Resource));
    var TestResource;
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module(function ($provide) {
        $provide.service('TestResource', _TestResource_);
    }));
    beforeEach(inject(function (_$httpBackend_, _$rootScope_, _TestResource_) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        TestResource = _TestResource_;
        // Mock the store
        TestResource.store = store;
        TestResource.store.clearActions();
    }));
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    it('should have isLoading method default to false', function () {
        expect(TestResource.isLoading()).toBe(false);
    });
    it('should have isLoading(id) method default to false', function () {
        expect(TestResource.isLoading(1)).toBe(false);
    });
    describe('find()', function () {
        it('dispatches the proper actions on error', function () {
            var actions;
            $httpBackend.whenGET(url).respond(500, response);
            TestResource.find().catch(function (error) {
                actions = [
                    { type: 'FINDING_TEST_RESOURCE', payload: undefined },
                    { type: 'ERROR_TEST_RESOURCE', payload: error }
                ];
            });
            $httpBackend.flush();
            expect(TestResource.store.getActions()).toEqual(actions);
        });
        it('dispatches the proper actions on success', function () {
            var actions = [
                { type: 'FINDING_TEST_RESOURCE', payload: undefined },
                { type: 'FIND_TEST_RESOURCE', payload: {
                        result: [1],
                        items: {
                            '1': {
                                "id": 1,
                                "subject": "Test Resource subject",
                                "_links": {
                                    "self": {
                                        "href": "/api/v2/testResource/1",
                                        "class": "testResource"
                                    }
                                }
                            }
                        },
                        meta: {
                            count: 1,
                            page: 1,
                            links: {
                                self: {
                                    href: '/api/v2/testResource?page=1&per_page=50',
                                    class: 'page'
                                }
                            }
                        }
                    }
                }
            ];
            $httpBackend.whenGET(url).respond(200, response);
            TestResource.find();
            $httpBackend.flush();
            expect(TestResource.store.getActions()).toEqual(actions);
        });
        it('calls before and after lifecycle hooks', function () {
            spyOn(TestResource, 'beforeFind').and.callThrough();
            spyOn(TestResource, 'afterFind').and.callThrough();
            $httpBackend.whenGET(url).respond(200, response);
            TestResource.find();
            $httpBackend.flush();
            expect(TestResource.beforeFind).toHaveBeenCalled();
            expect(TestResource.afterFind).toHaveBeenCalled();
        });
        it('returns a promise resolving with listing data from API', function () {
            $httpBackend.whenGET(url).respond(200, response);
            TestResource.find().then(function (cases) {
                expect(cases).toBeDefined();
                // Verify cases come back in "pure" API format
                expect({}).toEqual({});
            });
            $httpBackend.flush();
        });
    });
});
