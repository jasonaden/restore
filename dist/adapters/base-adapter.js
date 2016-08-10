// TODO: Add beforeAny and afterAny that always happens no matter
// what method is called
"use strict";
var base_persistor_1 = require('../persistors/base-persistor');
/*
* base adapter implementation.
*/
var BaseAdapter = (function () {
    function BaseAdapter(schema, store, persistor) {
        /**
         * Promise library to use throughout the adapter
         */
        this.promise = Promise;
        this.schema = schema ? schema : {};
        this.store = store;
        this.persistor = persistor ? persistor : new base_persistor_1.BasePersistor();
    }
    /**
     * generateSlug is used when storing data in the redux store. It's the key by which the data is put into the store.
     */
    BaseAdapter.prototype.generateSlug = function (entity) {
        return entity.id;
    };
    // with chained error catching
    // need to see about simplifying this and still letting  
    // it catch errors along the way.
    // This sets up a promise chain that: 
    //  1) Passes the received params to beforeFindOne()
    //  2) Passes the beforeFindOne promise to persistor.findOne()
    //  3) Passes the persistor.beforeFineOne promise to afterFindOne()
    //  4) Passes the afterFindOne promise to splitSchema to normalize the data
    BaseAdapter.prototype.findOne = function (config) {
        var _this = this;
        return this.beforeFindOne(config)
            .then(function (beforePromise) {
            var config = beforePromise[0];
            return _this.persistor.findOne(config);
        })
            .then(function (persistorPromise) {
            var data = persistorPromise[0];
            return _this.afterFindOne(data);
        });
    };
    // Default version is a no-op that passes along the
    //  params passed in 
    BaseAdapter.prototype.beforeFindOne = function (params) {
        return this.promise.all([params]);
    };
    // Default version is a no-op that passes along the 
    //  persistor's returned promise. 
    BaseAdapter.prototype.afterFindOne = function (data) {
        return this.promise.all([data]);
    };
    BaseAdapter.prototype.find = function (config) {
        var _this = this;
        return this.beforeFind(config)
            .then(function (_a) {
            var config = _a[0];
            return _this.persistor.find(config.params);
        })
            .then(function (res) { return _this.afterFind(config.listName, res.data); });
    };
    BaseAdapter.prototype.beforeFind = function (params) {
        return this.promise.all([params]);
    };
    BaseAdapter.prototype.afterFind = function (data) {
        return Promise.resolve(data);
    };
    /**
     * Lifecycle Hooks:
     *
     * * `beforeAdd(payload[, cb])`
     * * `afterAdd(payload[, cb])`
     */
    BaseAdapter.prototype.add = function (data, params) {
        var _this = this;
        return this.beforeAdd(data, params) // run before hook
            .then(function (_a) {
            var data = _a[0], params = _a[1];
            return _this.persistor.create(data, params);
        }) // persist
            .then(function (x) { return _this.afterAdd(x); }); // run after hook
    };
    /**
     * Default hook (return what was passed in). Because .all is being used,
     * it's possible that `payload` or `params` could be a promise that returns the
     * payload or params, so it's not a pure identity function.
     */
    BaseAdapter.prototype.beforeAdd = function (payload, params) {
        return this.promise.all([payload, params]);
    };
    /**
     * Default identity hook (return what was passed in)
     */
    BaseAdapter.prototype.afterAdd = function (data) {
        return Promise.resolve(data);
    };
    BaseAdapter.prototype.update = function (data, params) {
        var _this = this;
        return this.beforeUpdate(data, params)
            .then(function (_a) {
            var data = _a[0], config = _a[1];
            return _this.persistor.update(data, config);
        })
            .then(function (x) { return _this.afterUpdate(x); });
    };
    BaseAdapter.prototype.beforeUpdate = function (data, params) {
        return this.promise.all([data, params]);
    };
    BaseAdapter.prototype.afterUpdate = function (data) {
        return Promise.resolve(data);
    };
    BaseAdapter.prototype.destroy = function (params) {
        var _this = this;
        return this.beforeDestroy(params)
            .then(function (_a) {
            var params = _a[0];
            return _this.persistor.destroy(params);
        })
            .then(function (x) { return _this.afterDestroy(x); });
    };
    BaseAdapter.prototype.beforeDestroy = function (params) {
        return this.promise.all([params]);
    };
    BaseAdapter.prototype.afterDestroy = function (data) {
        return Promise.resolve(data);
    };
    return BaseAdapter;
}());
exports.BaseAdapter = BaseAdapter;
