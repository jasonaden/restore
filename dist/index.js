"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Resource class
var resource_1 = require('./resources/resource');
exports.Resource = resource_1.Resource;
// resource reducer
var resource_reducer_1 = require('./resources/resource-reducer');
exports.defaultReducer = resource_reducer_1.defaultReducer;
// interfaces
// don't need to export since they will be in .d.ts file?
/*
export {
  IResourceAdapter,
  IResourceAdapterConfig,
  IResourceRequestConfig,
  IEntityState
} from './resources/interfaces';*/
// resource-adapter
var resource_adapter_1 = require('./resources/resource-adapter');
exports.ResourceAdapter = resource_adapter_1.ResourceAdapter;
// utils
var utils_1 = require('./utils');
exports.flattenEmbedded = utils_1.flattenEmbedded;
exports.generateConfig = utils_1.generateConfig;
exports.joinUrl = utils_1.joinUrl;
exports.parseJson = utils_1.parseJson;
exports.transform = utils_1.transform;
__export(require('./resources/constants'));

// this file is only being used by karma
require('phantomjs-polyfill');
requireAll(require.context("./", true, /spec.ts$/));
function requireAll(r) {
    r.keys().forEach(r);
}

"use strict";
var joinUrl_1 = require('./utils/joinUrl');
exports.joinUrl = joinUrl_1.joinUrl;
var transform_1 = require('./utils/transform');
exports.transform = transform_1.transform;
var parseJson_1 = require('./utils/parseJson');
exports.parseJson = parseJson_1.parseJson;
var flattenEmbedded_1 = require('./utils/flattenEmbedded');
exports.flattenEmbedded = flattenEmbedded_1.flattenEmbedded;
var generateConfig_1 = require('./utils/generateConfig');
exports.generateConfig = generateConfig_1.generateConfig;

"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
var splitSchema_1 = require('../utils/splitSchema');
// TODO: Implement this function. Need to configure what to do after adding.
function add(config, payload, args) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.ADDING, config.className));
        return config.adapter.execute({
            url: config.url,
            method: 'POST'
        })
            .then(function (res) {
            alert("Need to implement what to do after ADD (ADD TO STORE)");
            dispatch(splitSchema_1.splitSchema(config.schema, config.className, res.data));
            return res.data;
        }, function (error) {
            alert('Error adding!');
            dispatch(action_1.action(constants_1.ERROR, config.className, error));
            return config.$q.reject(error);
        });
    };
}
exports.add = add;

"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
var splitSchema_1 = require('../utils/splitSchema');
// TODO: Implement this function. Need to configure what to do after destroying server-side.
function destroy(config, id, args) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.DESTROYING, config.className));
        return config.adapter.execute({
            url: id,
            method: 'DELETE'
        })
            .then(function (res) {
            alert("Need to implement what to do after delete (remove from store)");
            dispatch(splitSchema_1.splitSchema(config.schema, config.className, res.data));
            return res.data;
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, config.className, error));
            return config.$q.reject(error);
        });
    };
}
exports.destroy = destroy;

"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
var splitSchema_1 = require('../utils/splitSchema');
function find(config, args) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.FINDING, config.className));
        // TODO: This should not be tied to an HTTP request. What if the 
        // data needs to be stored in local storage? Should simply tell 
        // the adapter to load something and pass config data.
        return config.adapter.execute(config)
            .then(function (res) {
            dispatch(splitSchema_1.splitSchema(config.schema, config.className, res.data));
            return res.data;
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, config.className, error));
            return config.$q.reject(error);
        });
    };
}
exports.find = find;

"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
var splitSchema_1 = require('../utils/splitSchema');
function findOne(config, args) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.FINDING_ONE, config.className));
        return config.adapter.execute({
            url: config.url,
            method: 'GET'
        })
            .then(function (res) {
            dispatch(splitSchema_1.splitSchema(config.schema, config.className, res.data));
            return res.data;
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, config.className, error));
            return config.$q.reject(error);
        });
    };
}
exports.findOne = findOne;



"use strict";
// ACTION TYPES
exports.FIND_ONE = "FIND_ONE";
exports.FINDING_ONE = "FINDING_ONE";
exports.FOUND_ONE = "FOUND_ONE";
exports.FIND = "FIND";
exports.FINDING = "FINDING";
exports.FOUND = "FOUND";
exports.ADD = "ADD";
exports.ADDING = "ADDING";
exports.ADDED = "ADDED";
exports.DESTROY = "DESTROY";
exports.DESTROYING = "DESTROYING";
exports.DESTROYED = "DESTROYED";
exports.PATCH = "PATCH";
exports.PATCHING = "PATCHING";
exports.PATCHED = "PATCHED";
exports.UPDATE = "UPDATE";
exports.UPDATING = "UPDATING";
exports.UPDATED = "UPDATED";
exports.REFRESH = "REFRESH";
exports.REFRESHING = "REFRESHING";
exports.REFRESHED = "REFRESHED";
exports.ERROR = "ERROR";

"use strict";

"use strict";
var resource_adapter_config_1 = require('./resource-adapter-config');
describe("ResourceAdapterConfig", function () {
    var adapterConfig;
    beforeEach(function () {
        adapterConfig = new resource_adapter_config_1.ResourceAdapterConfig({
            url: '/my-resource/{{@id}}',
            method: 'POST',
            transformResponse: function (data) {
                return data;
            },
            interceptor: {
                request: function (request) {
                    return request;
                },
                response: function (response) {
                    return response;
                },
                responseError: function (response) {
                    return $q.reject(response);
                }
            }
        });
    });
    /**
     * Begin Tests
     */
    it('creates an instance of ResourceAdapterConfig', function () {
        expect(adapterConfig instanceof resource_adapter_config_1.ResourceAdapterConfig).toBe(true);
    });
    it('extends/inherits an instance', function () {
        adapterConfig = adapterConfig.extend({
            url: '/my-resource/123'
        });
        expect(adapterConfig.method).toBe('POST');
        expect(adapterConfig.url).toBe('/my-resource/123');
        expect(typeof adapterConfig.interceptor).toBe('object');
        expect(typeof adapterConfig.transformResponse).toBe('function');
        expect(adapterConfig instanceof resource_adapter_config_1.ResourceAdapterConfig).toBe(true);
    });
    it('defaults to GET request', function () {
        adapterConfig = adapterConfig.extend({ method: null });
        expect(adapterConfig.build().method).toBe('GET');
    });
    it('defaults source property to configObject.data', function () {
        adapterConfig = adapterConfig.extend({ method: 'PUT', data: { id: 101 } });
        expect(adapterConfig.build().url).toBe('/my-resource/101');
    });
    it('uses configObject.params to replace non-@ prefixed params in query string', function () {
        adapterConfig = adapterConfig.extend({
            url: adapterConfig.url + '?q={{query}}',
            method: 'PUT',
            data: { id: 101 },
            params: {
                query: 'something'
            }
        });
        expect(adapterConfig.build().url).toBe('/my-resource/101?q=something');
    });
    it('uses configObject.params to replace non-@ prefixed params in path body', function () {
        // And in path body
        adapterConfig = adapterConfig.extend({
            url: adapterConfig.url + '/{{id}}',
            method: 'PUT',
            data: { id: 101 },
            params: {
                id: 102
            }
        });
        expect(adapterConfig.build().url).toBe('/my-resource/101/102');
    });
});

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

"use strict";
var constants_1 = require('./constants');
function defaultEntityState() {
    return {
        result: [],
        loadingMany: false,
        loadingOne: false,
        deleting: false,
        patching: false,
        adding: false,
        items: {}
    };
}
/**
 * Generic reducer for items of any type (entities). Produces a state tree like:
 *
 * ```
 *  entities = {
 *    cases: {
 *      // sequence of cases as returned from most recent API call
 *      result: [6, 3, 5, ...],
 *      loadingMany: true,
 *      loadingOne: true,
 *      deleting: false,
 *      patching: false,
 *      adding: false,
 *      items: {
 *        3: {...},
 *        5: {...},
 *        6: {...},
 *        ...
 *      },
 *      meta: {
 *        count: 100,
 *        page: 2,
 *        links: {
 *          ...
 *        }
 *      }
 *    }
 *  }
 * ```
 */
function defaultReducer(type) {
    /**
     * Simple function for concatinating the type const with the type value.
     *
     * ```
     *  t("LOADING_SOMETHING", "CASE"); // returns LOADING_SOMETHING_CASE
     * ```
     */
    function t(str, type) {
        return str + '_' + type;
    }
    return function (state, action) {
        if (state === void 0) { state = defaultEntityState(); }
        var s = Object.assign({}, state);
        if (!action) {
            return state;
        }
        switch (action.type) {
            // SETUP ACTIONABLE ITEMS
            case constants_1.FINDING + "_" + type:
                return Object.assign(s, { loadingMany: true });
            case constants_1.FINDING_ONE + "_" + type:
                return Object.assign(s, { loadingOne: true });
            case constants_1.DESTROYING + "_" + type:
                return Object.assign(s, { deleting: true });
            case constants_1.PATCHING + "_" + type:
                return Object.assign(s, { patching: true });
            case constants_1.ADDING + "_" + type:
                return Object.assign(s, { adding: true });
            // This is the load many action. FIND_CASE for instance vs FIND_ONE_CASE.
            case t(constants_1.FIND, type):
                // Turn off loading indicator
                s.loadingMany = false;
                // Apply the sequenced result array
                s.result = action.payload.result.slice(0);
                // Iterate results and add each item
                s.items = Object.assign({}, s.items);
                s.result.forEach(function (key) {
                    s.items[key] = action.payload.items[key];
                });
                // Apply metadata
                s.meta = Object.assign({}, action.payload.meta);
                return s;
            case t(constants_1.FIND_ONE, type):
                debugger;
                return s;
            case t(constants_1.ADD, type):
                s.items = Object.assign({}, s.items);
                s.items[action.payload._links.self.href] = action.payload;
                return s;
            // TODO: ERROR CASE
            default:
                return state;
        }
    };
}
exports.defaultReducer = defaultReducer;

"use strict";
var resource_reducer_1 = require('./resource-reducer');
require('angular-mocks');
var constants_1 = require('./constants');
var type = 'CASE';
var reducer;
describe('defaultReducer', function () {
    beforeEach(function () {
        reducer = resource_reducer_1.defaultReducer(type);
    });
    it('returns a default state', function () {
        expect(reducer(undefined, {})).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: false,
            deleting: false,
            patching: false,
            adding: false,
            items: {}
        });
    });
    it('should handle FINDING_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.FINDING + "_" + type
        })).toEqual({
            result: [],
            loadingMany: true,
            loadingOne: false,
            deleting: false,
            patching: false,
            adding: false,
            items: {}
        });
    });
    it('should handle FINDING_ONE_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.FINDING_ONE + "_" + type
        })).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: true,
            deleting: false,
            patching: false,
            adding: false,
            items: {}
        });
    });
    it('should handle DESTROYING_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.DESTROYING + "_" + type
        })).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: false,
            deleting: true,
            patching: false,
            adding: false,
            items: {}
        });
    });
    it('should handle PATCHING_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.PATCHING + "_" + type
        })).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: false,
            deleting: false,
            patching: true,
            adding: false,
            items: {}
        });
    });
    it('should handle ADDING_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.ADDING + "_" + type
        })).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: false,
            deleting: false,
            patching: false,
            adding: true,
            items: {}
        });
    });
    it('should handle FIND_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.FIND + "_" + type,
            payload: {
                result: ['/cases/1'],
                items: {
                    '/cases/1': {
                        _links: { self: { href: '/cases/1' } }, _embedded: { entries: [{}] }
                    }
                }
            }
        })).toEqual({
            result: ['/cases/1'],
            loadingMany: false,
            loadingOne: false,
            deleting: false,
            patching: false,
            adding: false,
            items: {
                '/cases/1': {
                    _links: { self: { href: '/cases/1' } }, _embedded: { entries: [{}] }
                }
            },
            meta: {}
        });
    });
});

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

"use strict";
var buildUrl_1 = require('./buildUrl');
describe('buildUrl', function () {
    it('returns a basic URL', function () {
        var config = {
            url: '/thing',
            method: 'POST'
        };
        var url = buildUrl_1.buildUrl(config);
        expect(url).toBe(config.url);
    });
    it('returns empty string if there is no config.url', function () {
        var config = {
            url: undefined,
            method: 'POST'
        };
        var url = buildUrl_1.buildUrl(config);
        expect(url).toBe('');
    });
    it('drops ID param on POST', function () {
        var config = {
            url: '/thing/{{@id}}',
            method: 'POST'
        };
        var config2 = {
            url: '/thing/{{@thingId}}/thang/{{@id}}',
            method: 'POST'
        };
        var source = {};
        var source2 = {
            id: 1,
            thingId: 2
        };
        var url = buildUrl_1.buildUrl(config, source);
        var url2 = buildUrl_1.buildUrl(config2, source2);
        expect(url).toBe('/thing');
        expect(url2).toBe('/thing/2/thang');
    });
    it('replaces ID param on PUT', function () {
        var config = {
            url: '/thing/{{@id}}',
            method: 'PUT'
        };
        var source = {
            id: 11
        };
        var url = buildUrl_1.buildUrl(config, source);
        expect(url).toBe('/thing/11');
    });
    it('replaces @param values from source', function () {
        var config = {
            url: '/thing/{{@thingId}}/thang/{{@id}}',
            method: 'GET'
        };
        var source = {
            id: 1,
            thingId: 2
        };
        var url = buildUrl_1.buildUrl(config, source);
        expect(url).toBe('/thing/2/thang/1');
    });
    it('replaces @thing.param values from source', function () {
        var config = {
            url: '/thing/{{@thang.id}}',
            method: 'GET'
        };
        var source = {
            thang: {
                id: 2
            }
        };
        var url = buildUrl_1.buildUrl(config, source);
        expect(url).toBe('/thing/2');
    });
    it('replaces `{{something}}` from config.params and removes from config.params', function () {
        var config = {
            url: '/thing/{{@id}}?filter={{filter}}',
            method: 'GET',
            params: {
                filter: 'priority'
            }
        };
        var source = {
            id: 2
        };
        var url = buildUrl_1.buildUrl(config, source);
        expect(url).toBe('/thing/2?filter=priority');
    });
    it('maps object keys using the map param', function () {
        var config = {
            url: '/thing/{{@id}}',
            method: 'GET'
        };
        var source = {
            longThingId: 2
        };
        var url = buildUrl_1.buildUrl(config, source, { id: "longThingId" });
        expect(url).toBe('/thing/2');
    });
});

"use strict";
/**
 * Takes HAL formatted response data and flattens the embedded data into
 * the base object. Example:
 *
 * ```
 * // Data In:
 * {
 *   _embedded: {
 *     customer: {
 *       id: 1,
 *       name: 'John'
 *     }
 *   },
 *   id: 1,
 *   name: 'John\'s Case'
 * }
 *
 * // Returns:
 * {
 *   _embedded: {
 *     customer: {
 *       id: 1,
 *       name: 'John'
 *     }
 *   },
 *   id: 1,
 *   name: 'John\'s Case'
 *   customer: {
 *     id: 1,
 *     name: 'John'
 *   }
 * }
 *
 * ```
 */
function flattenEmbedded(data, headers) {
    if (!data || !data._embedded)
        return data;
    // Verify this is HAL and check if we're dealing with embedded 
    // objects (like from an endpoint returning multiple entries)
    if (data._embedded.entries && Array.isArray(data._embedded.entries)) {
        data._embedded.entries = data._embedded.entries.map(flatten);
    }
    // Then always flatten
    return flatten(data);
    function flatten(data) {
        if (data._embedded) {
            for (var key in data._embedded) {
                data[key] = data._embedded[key];
            }
        }
        return data;
    }
}
exports.flattenEmbedded = flattenEmbedded;

"use strict";
var utils_1 = require('../utils');
describe('flattenEmbedded', function () {
    it('flattens embedded data', function () {
        var value = 'some value';
        var data = {
            _embedded: {
                p: value
            }
        };
        var flattened = utils_1.flattenEmbedded(data);
        expect(flattened.p).toBe(value);
    });
});

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

"use strict";
/**
 * From ds.Util.getPath
 */
function getPath(obj, path, setPath) {
    if (path === void 0) { path = ""; }
    var aPath = path.split(".");
    var target = obj;
    while (aPath.length && target) {
        var key = aPath.shift();
        if (key) {
            if ((typeof target[key] === 'undefined' || !aPath.length) && typeof setPath !== 'undefined') {
                target[key] = aPath.length ? {} : setPath;
            }
            target = target[key];
        }
    }
    return target;
}
exports.getPath = getPath;

"use strict";
var getPath_1 = require('./getPath');
describe('getPath', function () {
    it('pulls data from the base of an object', function () {
        var obj = {
            id: 101
        };
        expect(getPath_1.getPath(obj));
    });
});

"use strict";
/**
 * Join a URL with a baseURL. You can also optionally leave a trailing slash at the end of a URL.
 *
 * <p>If the url fragment begins with a special char, don't join with a slash.</p>
 *
 * <p> For example, if baseUrl was '/resources' and url was '.json', you'd want '/resources.json'</p>
*/
function joinUrl(url, baseUrl, removeTrailingSlash) {
    if (baseUrl === void 0) { baseUrl = '/'; }
    if (removeTrailingSlash === void 0) { removeTrailingSlash = true; }
    var delimit;
    if (baseUrl && !RegExp("^" + baseUrl).test(url)) {
        delimit = /^[\w\d]/.test(url) ? '/' : '';
        url = [baseUrl, url].join(delimit);
    }
    return removeTrailingSlash ? url.replace(/\/$/, '') : url;
}
exports.joinUrl = joinUrl;

"use strict";
var joinUrl_1 = require('./joinUrl');
describe('joinUrl', function () {
    var baseUrl = '/base-url';
    it('does not join with a slash if the URL begins with a special character', function () {
        var url = '.json';
        var joined = joinUrl_1.joinUrl(url, baseUrl, undefined);
        expect(joined).toEqual('/base-url.json');
    });
    it('joins a URL', function () {
        var url = 'resources/';
        var joined = joinUrl_1.joinUrl(url, baseUrl, undefined);
        expect(joined).toEqual('/base-url/resources');
    });
    it('allows the trailing slash to be preserved', function () {
        var url = 'resources/';
        var removeTrailingSlash = false;
        var joined = joinUrl_1.joinUrl(url, baseUrl, removeTrailingSlash);
        expect(joined).toEqual('/base-url/resources/');
    });
});

"use strict";
// From DsResourceAdapterConfig
function mapQueryParams(params, queryMap) {
    var key, map, paramsCopy, value;
    if (!(params && queryMap)) {
        return;
    }
    paramsCopy = {};
    for (key in params) {
        value = params[key];
        if (map = queryMap[key]) {
            switch (typeof map) {
                case 'string':
                    paramsCopy[map] = value;
                    break;
                case 'function':
                    Object.assign(paramsCopy, map(value));
            }
        }
        else {
            paramsCopy[key] = value;
        }
    }
    return paramsCopy;
}
exports.mapQueryParams = mapQueryParams;

"use strict";
var transform_1 = require('./transform');
function parseJson(datePattern, revive, data, headers) {
    if (datePattern === void 0) { datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/; }
    if (revive === void 0) { revive = function (k, v) { return v; }; }
    var reviver = function (key, value) {
        if (typeof value == 'string' && value.match(datePattern)) {
            return new Date(value);
        }
        else {
            return revive.call(this, key, value);
        }
    };
    var data;
    if (typeof data === 'string') {
        data = JSON.parse(data, reviver);
    }
    else if (data != null) {
        transform_1.transform(data, reviver);
    }
    return data;
}
exports.parseJson = parseJson;

"use strict";
var parseJson_1 = require('./parseJson');
describe('parseJson', function () {
    it('allows a custom reviver', function () {
        var reviver = function (key, value) {
            if (key === '') {
                return value;
            }
            return value * 2;
        };
        var data = '{ "p": 5 }';
        var parsed = parseJson_1.parseJson(undefined, reviver, data, undefined);
        expect(parsed.p).toBe(10);
    });
    it('parses JSON', function () {
        var data = '{ "foo": "bar" }';
        var parsed = parseJson_1.parseJson(undefined, undefined, data, undefined);
        expect(parsed).toEqual({
            foo: 'bar'
        });
    });
    it('creates date objects', function () {
        var comparisonDate = new Date('1963-11-22T00:00:00.000Z');
        var data = '{ "date": "1963-11-22T00:00:00.000Z" }';
        var parsed = parseJson_1.parseJson(undefined, undefined, data, undefined);
        expect(parsed.date.getTime()).toBe(comparisonDate.getTime());
    });
});

"use strict";
var normalizr_1 = require('normalizr');
var action_1 = require('../actions/action');
var constants_1 = require('../resources/constants');
var toCamelCase_1 = require('./toCamelCase');
var toLoudSnakeCase_1 = require('./toLoudSnakeCase');
function splitSchema(schema, name, data) {
    // Lowercase the schema name
    name = name.toLowerCase();
    return function (dispatch, store) {
        var normalized = normalizr_1.normalize(data.entries, normalizr_1.arrayOf(schema));
        // This is for testing only. If no results are returned, Normalizr will 
        // return result: [ undefined ] and entities[entity] = {undefined:{}}.
        if (normalized.result[0] === undefined) {
            normalized.result.length = 0;
            normalized.entities[toCamelCase_1.toCamelCase(name)] = {};
        }
        // Dispatch event for the main data that was gathered on this request.
        // This includes metadata about the collection.
        dispatch(action_1.action(constants_1.FIND, name.toUpperCase(), {
            result: normalized.result,
            items: normalized.entities[toCamelCase_1.toCamelCase(name)],
            meta: {
                count: data.total_entries,
                page: data.page,
                links: data._links
            }
        }));
        // Iterate over other objects that were returned (normalized) and 
        // dispatch add actions for them to get them into the store.
        for (var x in normalized.entities) {
            // Exclude main entity
            if (toLoudSnakeCase_1.toLoudSnakeCase(x) !== toLoudSnakeCase_1.toLoudSnakeCase(name)) {
                // Iterate over each object passed back and dispatch ADD action
                for (var y in normalized.entities[x]) {
                    dispatch(action_1.action(constants_1.ADD, toLoudSnakeCase_1.toLoudSnakeCase(x), normalized.entities[x][y]));
                }
            }
        }
    };
}
exports.splitSchema = splitSchema;

"use strict";
var tokenize_1 = require('./tokenize');
function toCamelCase(string) {
    if (!string) {
        return;
    }
    string = tokenize_1.tokenize(string).replace(/[ ](\w)/g, function (g0, g1, g2) { return g1.toUpperCase(); });
    return string = string[0].toLowerCase() + string.slice(1);
}
exports.toCamelCase = toCamelCase;

"use strict";
var toCamelCase_1 = require('./toCamelCase');
describe('toCamelCase', function () {
    var strings = [
        "aCamelCaseString",
        "a-dash-case--string",
        "a/folder/and/file.url?with=some&params",
        "A_mixed_snake_CASE_string",
        "$toadLips are really.warmAnd-$$_COZY©2013"
    ];
    it('converts to camelCase', function () {
        var actual, expected;
        expected = ["aCamelCaseString", "aDashCaseString", "aFolderAndFileUrlWithSomeParams", "aMixedSnakeCASEString", "toadLipsAreReallyWarmAndCOZY2013"];
        actual = strings.map(function (x) {
            return toCamelCase_1.toCamelCase(x);
        });
        return expect(actual).toEqual(expected);
    });
});

"use strict";
var tokenize_1 = require('./tokenize');
function toLoudSnakeCase(string) {
    if (string) {
        return tokenize_1.tokenize(string).replace(/[ ]/g, '_').toUpperCase();
    }
}
exports.toLoudSnakeCase = toLoudSnakeCase;

"use strict";
var tokenize_1 = require('./tokenize');
function toSnakeCase(string) {
    if (string) {
        return tokenize_1.tokenize(string).replace(/[ ]/g, '_').toLowerCase();
    }
}
exports.toSnakeCase = toSnakeCase;

"use strict";
function tokenize(str, ignorePattern) {
    if (str === void 0) { str = ""; }
    if (ignorePattern === void 0) { ignorePattern = ""; }
    return str
        .replace(new RegExp("([^A-Z])([A-Z])", "g"), '$1 $2')
        .replace(new RegExp("([^A-Za-z0-9 " + ignorePattern + "]*)([A-Za-z0-9 " + ignorePattern + "]*)", "g"), ' $2')
        .replace(new RegExp("[ ]+", "g"), ' ')
        .trim();
}
exports.tokenize = tokenize;

"use strict";
var tokenize_1 = require('./tokenize');
describe('Tokenize', function () {
    var strings = [
        "aCamelCaseString",
        "a-dash-case--string",
        "a/folder/and/file.url?with=some&params",
        "A_mixed_snake_CASE_string",
        "$toadLips are really.warmAnd-$$_COZY©2013"
    ];
    //[ ' a Camel Case String ', ' a dash case string ', ' a folder and file url with some params ', ' A mixed snake CASE string ', ' toad Lips are really warm And COZY 2013 ' ] //[ 'a Camel Case String', 'a dash case string', 'a folder and file url with some params', 'A mixed snake CASE string', 'toad Lips are really warm And COZY 2013' ]
    it('tokenizes a string', function () {
        var actual, expected;
        expected = ["a Camel Case String", "a dash case string", "a folder and file url with some params", "A mixed snake CASE string", "toad Lips are really warm And COZY 2013"];
        actual = strings.map(function (x) {
            return tokenize_1.tokenize(x);
        });
        return expect(actual).toEqual(expected);
    });
    it('tokenizes a string with an optional ignore pattern', function () {
        var actual, expected;
        expected = ["a Camel Case String", "a-dash-case--string", "a folder and file url with some params", "A mixed snake CASE string", "toad Lips are really warm And- COZY 2013"];
        actual = strings.map(function (x) {
            return tokenize_1.tokenize(x, "-");
        });
        return expect(actual).toEqual(expected);
    });
});

"use strict";
function transform(object, callback) {
    var walk;
    walk = function (object, key) {
        var k, v, value;
        value = object[key];
        if (value && typeof value === 'object') {
            for (k in value) {
                if (!value.hasOwnProperty(k))
                    continue;
                if (typeof (v = walk(value, k)) !== 'undefined') {
                    value[k] = v;
                }
                else {
                    delete value[k];
                }
            }
        }
        return callback.call(object, key, value);
    };
    return walk({
        '': object
    }, '');
}
exports.transform = transform;

"use strict";
var transform_1 = require('./transform');
describe('transform', function () {
    it('transforms a nested object', function () {
        var data = {
            foo: {
                bar: 'fizz'
            }
        };
        var callback = function (key, value) {
            if (key === 'bar' && value === 'fizz') {
                return 'buzz';
            }
            return value;
        };
        var transformed = transform_1.transform(data, callback);
        expect(transformed.foo.bar).toBe('buzz');
    });
});
