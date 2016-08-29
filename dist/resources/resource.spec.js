"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var resource_1 = require('./resource');
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
    beforeEach(function () {
        var store = mockStore({});
        // testResource = new TestResource(store, adapter, schema);
        testResource = new TestResource(store, adapter);
    });
});
