"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var uiResource_1 = require('./uiResource');
// import {BaseAdapter} from '../adapters/base-adapter';
// import {BasePersistor} from '../persistors/base-persistor';
var configureStore = require('redux-mock-store');
// import * as thunk from 'redux-thunk';
// import {Schema} from 'normalizr';
// const middlewares = [ thunk ]
var mockStore = configureStore();
describe('uiResource', function () {
    var TestUiResource = (function (_super) {
        __extends(TestUiResource, _super);
        function TestUiResource() {
            _super.apply(this, arguments);
            this.className = 'TEST_RESOURCE';
        }
        return TestUiResource;
    }(uiResource_1.uiResource));
    var testUiResource;
    var uiResourceMethods = ['get', 'populate'];
    beforeEach(function () {
        // let store = mockStore({});
        // testResource = new TestResource(store, adapter, schema);
        testUiResource = new TestUiResource(mockStore);
    });
    describe('testUiResource', function () {
        it('should be an instance of uiResource', function () {
            expect(testUiResource instanceof uiResource_1.uiResource).toBeTruthy();
        });
        it('should have a standard set of methods', function () {
            uiResourceMethods.forEach(function (item) {
                expect(typeof testUiResource[item]).toEqual('function');
            });
        });
    });
});
