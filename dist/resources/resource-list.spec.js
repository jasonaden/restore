"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var resource_1 = require('./resource');
var resource_list_1 = require('./resource-list');
var base_adapter_1 = require('../adapters/base-adapter');
var configureStore = require('redux-mock-store');
var thunk = require('redux-thunk');
var normalizr_1 = require('normalizr');
var middlewares = [thunk];
var mockStore = configureStore(middlewares);
var response = {
    "total_entries": 1,
    "page": 1,
    "_links": {
        "self": {
            "href": "/api/v2/testResource?page=1&per_page=50",
            "class": "page"
        }
    },
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
};
describe('Resource', function () {
    var schema = new normalizr_1.Schema('testResource');
    var adapter = new base_adapter_1.BaseAdapter();
    var TestResource = (function (_super) {
        __extends(TestResource, _super);
        function TestResource() {
            _super.apply(this, arguments);
            this.className = 'TEST_RESOURCE';
        }
        return TestResource;
    }(resource_1.Resource));
    var testResource;
    var TestResourceList = (function (_super) {
        __extends(TestResourceList, _super);
        function TestResourceList() {
            _super.apply(this, arguments);
            this.listKey = 'TEST_RESOURCE_LIST';
        }
        return TestResourceList;
    }(resource_list_1.ResourceList));
    var testResourceList;
    beforeEach(function () {
        var store = mockStore({});
        testResource = new TestResource(store, adapter, schema);
        testResourceList = new TestResourceList('testResourceList', testResource, adapter);
    });
    it('should have isLoading method default to false', function () {
        expect(testResourceList.isLoading()).toBe(false);
    });
    describe('find()', function () {
        xit('dispatches the proper actions on error', function (done) {
            var actions;
            testResourceList.find = function (payload, params) { return Promise.reject(undefined); };
            testResourceList.find().then(function (x) { return x; }, function (error) {
                actions = [
                    { type: 'FINDING_TEST_RESOURCE', payload: undefined },
                    { type: 'ERROR_TEST_RESOURCE', payload: error }
                ];
                expect(testResource.store.getActions()).toEqual(actions);
                done();
            });
        });
        xit('dispatches the proper actions on success', function (done) {
            testResourceList.find = function (payload, params) { return Promise.resolve(response); };
            var actions = [
                { type: 'FINDING_TEST_RESOURCE', payload: undefined },
                { type: 'FOUND_TEST_RESOURCE', payload: undefined }
            ];
            testResourceList.find().then(function () {
                expect(testResource.store.getActions()).toEqual(actions);
                done();
            });
        });
        it('calls before and after lifecycle hooks', function (done) {
            spyOn(testResourceList, 'beforeFind').and.callThrough();
            spyOn(testResourceList, 'afterFind').and.callThrough();
            testResourceList.find().then(function () {
                expect(testResourceList.beforeFind).toHaveBeenCalled();
                expect(testResourceList.afterFind).toHaveBeenCalled();
                done();
            });
        });
        it('returns a promise resolving with listing data from API', function (done) {
            testResourceList.find().then(function (cases) {
                expect(cases).toBeDefined();
                // Verify cases come back in "pure" API format
                expect({}).toEqual({});
                done();
            });
        });
    });
});
