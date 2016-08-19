"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_adapter_1 = require('./base-adapter');
var base_persistor_1 = require('../persistors/base-persistor');
var schemas_1 = require('../mocks/schemas');
var caseEmbedded_1 = require('../mocks/caseEmbedded');
var changesCase_1 = require('../mocks/changesCase');
var configureStore = require('redux-mock-store');
describe('BaseAdapter', function () {
    var $q;
    var prom;
    var mockStore;
    beforeEach(inject(function (_$q_) {
        $q = _$q_;
        mockStore = configureStore()({});
    }));
    var testPersistor = {
        create: function (data, params) { return Promise.resolve(Object.assign({}, data, { created: true })); },
        update: function (data, params, base) { return Promise.resolve(Object.assign({}, data, { updated: true })); },
        findOne: function (persistorConfig) { return Promise.all([caseEmbedded_1.caseEmbedded]); },
        find: function (params) { return Promise.all([changesCase_1.changesCase]); },
        destroy: function (params) { return Promise.resolve(null); }
    };
    var TestAdapter = (function (_super) {
        __extends(TestAdapter, _super);
        function TestAdapter() {
            _super.apply(this, arguments);
            this.persistence = testPersistor;
        }
        return TestAdapter;
    }(base_adapter_1.BaseAdapter));
    // basic instantiation
    describe('should set', function () {
        var adapter;
        beforeEach(function () {
            adapter = new base_adapter_1.BaseAdapter();
        });
        it('default persistor', function () {
            expect(adapter.persistor instanceof base_persistor_1.BasePersistor).toBe(true);
        });
        it('passed-in persistor', function () {
            var adapter = new base_adapter_1.BaseAdapter(null, null, testPersistor);
            expect(adapter.persistor).toBe(testPersistor);
        });
        it('an empty schema if none provided', function () {
            expect(adapter.schema).toEqual({});
        });
        it('the passed-in schema', function () {
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema);
            expect(adapter.schema).toEqual(schemas_1.appSchema);
        });
        it('basic methods', function () {
            // TODO fill out the list when finalized
            var methods = ['findOne', 'find'];
            methods.forEach(function (item) {
                expect(typeof adapter[item]).toEqual('function');
            });
        });
    });
    describe('should use a promise chain', function () {
        var adapter;
        beforeEach(function () {
            adapter = new base_adapter_1.BaseAdapter(null, null, testPersistor);
            spyOn(adapter, 'findOne').and.callThrough();
            spyOn(adapter, 'beforeFindOne').and.callThrough();
            spyOn(adapter.persistor, "findOne").and.callFake(function (persistorConfig) {
                return Promise.resolve({ data: { id: 567 } });
            });
            spyOn(adapter, 'afterFindOne').and.callThrough();
        });
        it('when invoking findOne', function (done) {
            adapter.findOne({ id: 123 })
                .then(function () {
                expect(adapter.beforeFindOne).toHaveBeenCalledWith({ id: 123 }, undefined);
                expect(adapter.persistor.findOne).toHaveBeenCalledWith({ id: 123 });
                expect(adapter.afterFindOne).toHaveBeenCalledWith({ id: 567 }, undefined);
                done();
            }, function (err) {
                expect("ERROR OCCURED: ").toEqual(err);
                done();
            });
        });
    });
    // TODO: These test for rejected promises. Probably need to 
    //  add tests for methods that just throw errors.
    describe('should handle errors anywhere on the chain', function () {
        var adapter;
        it('should catch rejections from the beforeFindOne', function (done) {
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, testPersistor);
            spyOn(adapter, 'beforeFindOne').and.callFake(function () {
                return [Promise.reject("in beforeFindOne")];
            });
            adapter.findOne({ id: 123 })
                .then(function () {
                expect('this success beforeFindOne test should not be running').toEqual('foo');
                done();
            }, function (err) {
                expect(err).toEqual('in beforeFindOne');
                done();
            });
        });
        it('should catch rejections from the call to the persistor', function (done) {
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, testPersistor);
            spyOn(adapter.persistor, "findOne").and.callFake(function () {
                return Promise.reject("in persistorFindOne");
            });
            adapter.findOne({ id: 123 })
                .then(function () {
                expect('this success persistor.findOne test should not be runnning').toEqual('foo');
                done();
            }, function (err) {
                expect(err).toEqual('in persistorFindOne');
                done();
            });
        });
        it('should catch rejections from the afterFindOne', function (done) {
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, testPersistor);
            spyOn(adapter, 'afterFindOne').and.callFake(function () {
                return Promise.reject("in afterFindOne");
            });
            adapter.findOne({ id: 123 })
                .then(function () {
                expect('this success afterFindOne test should not be running').toEqual('foo');
                done();
            }, function (err) {
                expect(err).toEqual('in afterFindOne');
                done();
            });
        });
    });
    // TODO: Move this to a test for the ApiV2 Adapter in POC
    // Split schema is in the ApiV2 Adapter, not the base
    xdescribe('splitSchema', function () {
        var adapter;
        var types = ['CASE', 'CUSTOMER', 'DRAFT', 'MESSAGE'];
        beforeEach(function () {
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, testPersistor);
            spyOn(adapter, 'splitSchema').and.callThrough();
        });
        it('should be called when a schema is provided', function (done) {
            adapter.findOne({ id: 123 })
                .then(function () {
                expect(adapter.splitSchema).toHaveBeenCalledWith(caseEmbedded_1.caseEmbedded);
                done();
            });
        });
        it('should dispatch events for each of the types of data returned', function (done) {
            adapter.findOne({ id: 123 })
                .then(function () {
                mockStore.getActions().map(function (item) {
                    // verify that we dispatched events for all the individual resources
                    expect(types.indexOf(item.type.split("_")[1]) > -1).toBeTruthy();
                });
                done();
            });
        });
    });
});
