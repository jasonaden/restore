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
var configureStore = require('redux-mock-store');
describe('BaseAdapter', function () {
    var $q;
    var prom;
    beforeEach(inject(function (_$q_) {
        $q = _$q_;
    }));
    var testPersistor = {
        create: function (data, params) { return Promise.resolve(Object.assign({}, data, { created: true })); },
        update: function (data, params, base) { return Promise.resolve(Object.assign({}, data, { updated: true })); },
        findOne: function (params) { return Promise.all([caseEmbedded_1.caseEmbedded]); },
        find: function (params) { return Promise.resolve([{ id: 123 }, { id: 456 }]); },
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
    // Error version -- used when forcing an error from the beforeFindOne()
    // describe('error version should use a promise chain', () => {
    //   let adapter; 
    //   beforeEach( () => {
    //     let tp = Object.assign( {}, testPersistor);
    //     tp.findOne = (params) => { return Promise.all([{id: 567}]) };
    //     adapter = new BaseAdapter(null, null, tp); 
    //     spyOn(adapter, 'findOne').and.callThrough();
    //     spyOn(adapter, 'beforeFindOne').and.callThrough();
    //     spyOn(adapter.persistor, "findOne").and.callThrough();
    //     spyOn(adapter, 'afterFindOne').and.callThrough();
    //   })
    //   it('when invoking findOne', (done) => {
    //     adapter.findOne({id: 123})
    //     .then( () => {
    //       expect(adapter.beforeFindOne).toHaveBeenCalledWith({id: 123});
    //       done();
    //     })    
    //   })
    // })
    describe('should use a promise chain', function () {
        var adapter;
        beforeEach(function () {
            var tp = Object.assign({}, testPersistor);
            tp.findOne = function (params) { return Promise.all([{ id: 567 }]); };
            adapter = new base_adapter_1.BaseAdapter(null, null, tp);
            spyOn(adapter, 'findOne').and.callThrough();
            spyOn(adapter, 'beforeFindOne').and.callThrough();
            spyOn(adapter.persistor, "findOne").and.callThrough();
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
        var adapter, mockStore;
        var types = ['CASE', 'CUSTOMER', 'DRAFT', 'MESSAGE'];
        beforeEach(function () {
            mockStore = configureStore()({});
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, testPersistor);
            spyOn(adapter, 'findOne').and.callThrough();
            spyOn(adapter, 'beforeFindOne').and.callThrough();
            spyOn(adapter.persistor, "findOne").and.callThrough();
            spyOn(adapter, 'afterFindOne').and.callThrough();
            spyOn(adapter, 'splitSchema').and.callThrough();
        });
        it('should be called when a schema is provided', function (done) {
            adapter.findOne({ id: 123 })
                .then(function () {
                expect(adapter.beforeFindOne).toHaveBeenCalledWith({ id: 123 });
                expect(adapter.persistor.findOne).toHaveBeenCalledWith({ id: 123 });
                expect(adapter.afterFindOne).toHaveBeenCalledWith(caseEmbedded_1.caseEmbedded);
                expect(adapter.splitSchema).toHaveBeenCalledWith(caseEmbedded_1.caseEmbedded);
                done();
            });
        });
        // TODO: Need to figure out how to test when the splitSchema() recieves
        //  something when it has no data about how to normalize
        xit('should fail if a type is received for which there is no schema', function (done) {
            var caseTemp = Object.assign({}, caseEmbedded_1.caseEmbedded);
            caseTemp._embedded.foo = { id: 1, name: 'bear' };
            // console.log("caseTemp._embedded", caseTemp._embedded.foo)
            var tp = Object.assign({}, testPersistor);
            tp.findOne = function (params) { return Promise.all([caseTemp]); };
            console.log('tp', tp.findOne.toString());
            mockStore = configureStore()({});
            adapter = new base_adapter_1.BaseAdapter(schemas_1.appSchema, mockStore, tp);
            try {
                adapter.findOne({ id: 123 })
                    .then(function () {
                    console.log("in the then");
                    expect(adapter.splitSchema).toHaveBeenCalled();
                    done();
                });
            }
            catch (err) {
                console.log("err", err);
            }
            // .then( () => {
            //   expect(adapter.splitSchema) toHaveBeenCalledWith( caseEmbedded );
            //   done();
            // })
        });
        // TODO: This is working but am doing a promise.resolve in the beforeFineOne 
        //  Need to determine if that is right or if it should be a promise.all().
        //  It might depend on what is being done in the beforeFindOne. 
        // May need to make them all promise.all() until the end to make sure
        //  that if a promise is used anywhere along the line that it will be 
        //  properly handled. 
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
