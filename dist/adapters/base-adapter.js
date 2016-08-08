// TODO: Add beforeAny and afterAny that always happens no matter
// what method is called
"use strict";
var base_persistor_1 = require('../persistors/base-persistor');
var normalizr_1 = require('normalizr');
var index_1 = require('../utils/index');
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
    // Use the passed-in schema to split out the data
    BaseAdapter.prototype.splitSchema = function (data) {
        var type = data._links.self.class;
        if (!this.schema[type]) {
            console.log("throwing an error", type);
        }
        var split = normalizr_1.normalize(data, this.schema[type]);
        for (var _i = 0, _a = Object.getOwnPropertyNames(split.entities); _i < _a.length; _i++) {
            var key = _a[_i];
            this.store.dispatch(index_1.buildAction(SET_ONE, key.toUpperCase(), split.entities[key]));
        }
        return split;
    };
    // with chained error catching
    // need to see about simplifying this and still letting  
    // it catch errors along the way.
    BaseAdapter.prototype.findOne = function (params) {
        var _this = this;
        return this.beforeFindOne(params)
            .then(function (beforePromise) {
            var params = beforePromise[0];
            return _this.persistor.findOne(params)
                .then(null, index_1.promiseError('persistor'));
        }, index_1.promiseError('beforePromise'))
            .then(function (persistorPromise) {
            var data = persistorPromise[0];
            return _this.afterFindOne(data)
                .then(null, index_1.promiseError('afterFindOne'));
        }, index_1.promiseError('persistorPromise'))
            .then(function (afterPromise) {
            var data = afterPromise[0];
            if (Object.keys(_this.schema).length) {
                return _this.promise.all([_this.splitSchema(data)])
                    .then(null, index_1.promiseError('normalize'));
            }
            else {
                return _this.promise.all([data])
                    .then(null, index_1.promiseError('non-normalize'));
            }
        }, index_1.promiseError);
    };
    // Default version is a no-op that passes along the
    //  params passed in 
    BaseAdapter.prototype.beforeFindOne = function (params) {
        return this.promise.all([params]);
        // return this.promise.all([this.promise.reject("because")]);
    };
    // Default version is a no-op that passes along the 
    //  persistor's returned promise. 
    BaseAdapter.prototype.afterFindOne = function (data) {
        return this.promise.all([data]);
        // return this.promise.all([this.promise.reject('no way')]);
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
    BaseAdapter.prototype.find = function (params) {
        var _this = this;
        return this.promise.all([this.beforeFind(params)])
            .then(function (_a) {
            var params = _a[0];
            return _this.persistor.find(params);
        })
            .then(function (x) { return _this.afterFind(x); });
    };
    BaseAdapter.prototype.beforeFind = function (params) {
        return this.promise.all([params]);
    };
    BaseAdapter.prototype.afterFind = function (data) {
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
    BaseAdapter.prototype.beforeDestroy = function (data, params) {
        return this.promise.all([data, params]);
    };
    BaseAdapter.prototype.afterDestroy = function (data) {
        return Promise.resolve(data);
    };
    return BaseAdapter;
}());
exports.BaseAdapter = BaseAdapter;
