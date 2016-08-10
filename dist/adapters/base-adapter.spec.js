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
        findOne: function (params) { return Promise.all([caseEmbedded_1.caseEmbedded]); },
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
    // TODO: playground
    describe('developing', function () {
        var adapter;
        var types = ['CASE', 'CUSTOMER', 'DRAFT', 'MESSAGE'];
        beforeEach(function () {
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, testPersistor);
            spyOn(adapter, 'findOne').and.callThrough();
            spyOn(adapter, 'beforeFindOne').and.callThrough();
            spyOn(adapter.persistor, "findOne").and.callThrough();
            spyOn(adapter, 'afterFindOne').and.callThrough();
            spyOn(adapter, 'splitSchema').and.callThrough();
        });
        it('should handle the changes properly', function (done) {
            adapter.findOne({ id: 123 })
                .then(function () {
                expect(adapter.beforeFindOne).toHaveBeenCalledWith({ id: 123 });
                expect(adapter.persistor.findOne).toHaveBeenCalledWith({ id: 123 });
                expect(adapter.afterFindOne).toHaveBeenCalledWith(caseEmbedded_1.caseEmbedded);
                expect(adapter.splitSchema).toHaveBeenCalledWith(caseEmbedded_1.caseEmbedded);
                done();
            }, function (err) {
                expect(adapter.splitSchema).toThrow();
                console.log("test error!!!!", err.message);
                done();
            });
        });
    });
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
            spyOn(adapter.persistor, "findOne").and.callFake(function (params) { return Promise.all([{ id: 567 }]); });
            spyOn(adapter, 'afterFindOne').and.callThrough();
        });
        it('when invoking findOne', function (done) {
            adapter.findOne({ id: 123 })
                .then(function () {
                expect(adapter.beforeFindOne).toHaveBeenCalledWith({ id: 123 });
                expect(adapter.persistor.findOne).toHaveBeenCalledWith({ id: 123 });
                expect(adapter.afterFindOne).toHaveBeenCalledWith({ id: 567 });
                done();
            });
        });
    });
    describe('splitSchema', function () {
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
    // TODO: These test for rejected promises. Probably need to 
    //  add tests for methods that just throw errors.
    describe('should handle errors anywhere on the chain', function () {
        var adapter;
        it('should catch rejections in beforeFindOne', function (done) {
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, testPersistor);
            spyOn(adapter, 'beforeFindOne').and.callFake(function () { return Promise.reject("in beforeFindOne"); });
            adapter.findOne({ id: 123 })
                .then(function () {
                expect('this should not run').toBeTruthy;
                done();
            }, function (err) {
                expect(err).toEqual('findOne failed in beforeFindOne');
                done();
            });
        });
        it('should catch rejections in the call to the persistor', function (done) {
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, testPersistor);
            spyOn(adapter.persistor, "findOne").and.callFake(function () { return Promise.reject("in persistorFindOne"); });
            adapter.findOne({ id: 123 })
                .then(function () {
                expect('this should not run').toBeTruthy;
                done();
            }, function (err) {
                expect(err).toEqual('findOne failed in persistorFindOne');
                done();
            });
        });
        it('should catch rejections in afterFindOne', function (done) {
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, testPersistor);
            spyOn(adapter, 'afterFindOne').and.callFake(function () { return Promise.reject("in afterFindOne"); });
            adapter.findOne({ id: 123 })
                .then(function () {
                expect('this should not run').toBeTruthy;
                done();
            }, function (err) {
                expect(err).toEqual('findOne failed in afterFindOne');
                done();
            });
        });
        // TODO: because the where the fail method is set on the final findOne() "then", 
        //  this error is just returned and does not go through the 'fail' method.
        it('should catch rejections in splitSchema', function (done) {
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, testPersistor);
            spyOn(adapter, 'splitSchema').and.callFake(function () { return Promise.reject("in splitSchema"); });
            adapter.findOne({ id: 123 })
                .then(function () {
                expect('this should not run').toBeTruthy;
                done();
            }, function (err) {
                expect(err).toEqual('in splitSchema');
                done();
            });
        });
    });
    describe('has an add method that', function () {
        var adapter;
        var newObj;
        beforeEach(function () {
            newObj = { id: 789 };
            adapter = new TestAdapter({});
        });
        it('runs before and after methods', function (done) {
            spyOn(adapter, 'beforeAdd').and.callThrough();
            spyOn(adapter, 'afterAdd').and.callThrough();
            adapter.add(newObj)
                .then(function (createdObj) {
                expect(adapter.beforeAdd).toHaveBeenCalledWith(newObj, undefined);
                expect(adapter.afterAdd).toHaveBeenCalled();
                done();
            });
        });
        it('runs adapter.persistence.create', function (done) {
            adapter.add(newObj).then(function (createdObj) {
                expect(createdObj.id).toBe(789);
                expect(createdObj.created).toBe(true);
                done();
            });
        });
        xdescribe('takes config object', function () {
            it('and passes through to beforeAdd', function (done) {
                spyOn(adapter, 'beforeAdd').and.callThrough();
                spyOn(adapter.persistor, 'create').and.callThrough();
                var config = { config: 'object' };
                adapter.add(newObj, config).then(function (createdObj) {
                    expect(adapter.beforeAdd).toHaveBeenCalledWith(newObj, config);
                    expect(adapter.persistence.create).toHaveBeenCalledWith(newObj, config);
                    done();
                });
            });
        });
    });
});
