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
    // This sets up promise chains that: 
    //  1) Pass the received configurations to beforeFindOne() which returns an array
    //  2) Pass the beforeFindOne array to persistor.findOne() which returns a promise
    //  3) Pass the persistor.beforeFineOne promise to afterFindOne() which return a promise
    // ******* FINDONE ********* //
    BaseAdapter.prototype.findOne = function (persistorConfig, adapterConfig) {
        var _this = this;
        return this.promise.all(this.beforeFindOne(persistorConfig, adapterConfig))
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            return _this.persistor.findOne(persistorConfig);
        })
            .then(function (res) {
            return _this.afterFindOne(res.data, adapterConfig);
        })
            .then(null, 
        // TODO: We probably need to add some kind of logging here
        //  to log failures 
        function (err) {
            return Promise.reject(err);
        });
    };
    // Default version is a no-op that passes along the
    //  params passed in 
    BaseAdapter.prototype.beforeFindOne = function (persistorConfig, adapterConfig) {
        return [persistorConfig, adapterConfig];
    };
    // Default version is a no-op that passes along the 
    //  persistor's returned promise. 
    BaseAdapter.prototype.afterFindOne = function (data, adapterConfig) {
        return this.promise.all([data]);
    };
    // ******* FIND ********* //
    BaseAdapter.prototype.find = function (persistorConfig, adapterConfig) {
        var _this = this;
        return this.promise.all(this.beforeFind(persistorConfig, adapterConfig))
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            return _this.persistor.find(persistorConfig);
        })
            .then(function (res) { return _this.afterFind(res.data, adapterConfig); });
    };
    BaseAdapter.prototype.beforeFind = function (persistorConfig, adapterConfig) {
        return [persistorConfig, adapterConfig];
    };
    BaseAdapter.prototype.afterFind = function (data, adapterConfig) {
        return Promise.resolve(data);
    };
    // ******* ADD ********* //
    BaseAdapter.prototype.add = function (persistorConfig, adapterConfig) {
        var _this = this;
        return this.promise.all(this.beforeAdd(persistorConfig, adapterConfig)) // run before hook
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            return _this.persistor.create(persistorConfig);
        }) // persist
            .then(function (res) { return _this.afterAdd(res.data); }); // run after hook
    };
    /**
     * Default hook (return what was passed in). Because .all is being used,
     * it's possible that `payload` or `params` could be a promise that returns the
     * payload or params, so it's not a pure identity function.
     */
    BaseAdapter.prototype.beforeAdd = function (persistorConfig, adapterConfig) {
        return [persistorConfig, adapterConfig];
    };
    /**
     * Default identity hook (return what was passed in)
     */
    BaseAdapter.prototype.afterAdd = function (data) {
        return Promise.resolve(data);
    };
    // ******* UPDATE ********* //
    BaseAdapter.prototype.update = function (persistorConfig, adapterConfig) {
        var _this = this;
        return this.promise.all(this.beforeUpdate(persistorConfig, adapterConfig))
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            return _this.persistor.update(persistorConfig);
        })
            .then(function (res) { return _this.afterUpdate(res.data); });
    };
    BaseAdapter.prototype.beforeUpdate = function (persistorConfig, adapterConfig) {
        return [persistorConfig, adapterConfig];
    };
    BaseAdapter.prototype.afterUpdate = function (data) {
        return Promise.resolve(data);
    };
    // ******* DESTROY ********* //
    BaseAdapter.prototype.destroy = function (persistorConfig, adapterConfig) {
        var _this = this;
        return this.promise.all(this.beforeDestroy(persistorConfig, adapterConfig))
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            return _this.persistor.destroy(persistorConfig);
        })
            .then(function (x) { return _this.afterDestroy(x); });
    };
    BaseAdapter.prototype.beforeDestroy = function (persistorConfig, adapterConfig) {
        return [persistorConfig, adapterConfig];
    };
    BaseAdapter.prototype.afterDestroy = function (data) {
        return Promise.resolve(data);
    };
    return BaseAdapter;
}());
exports.BaseAdapter = BaseAdapter;
