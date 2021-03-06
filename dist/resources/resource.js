"use strict";
var add_1 = require('../actions/add');
var findOne_1 = require('../actions/findOne');
var find_1 = require('../actions/find');
var destroy_1 = require('../actions/destroy');
var update_1 = require('../actions/update');
/**
 *
 */
var Resource = (function () {
    /**
     * The Resource class is designed to be extended, rather than instantiated on its own.
     * Because it's extended, Angular's DI system will not pick up on the constructor
     * arguments, so anything Resource needs must be passed in. This is why the first
     * argument is `$injector` so the Resource can grab the services it needs.
     *
     * @param $injector $injector   Angular's injector. Inject this into the parent class
     *                              constructor and pass to the super() call.
     * @param adapter adapter       The ResourceAdapter instance to use in this Resource.
     * @param schema Schema         The Normalizr schema to use when parsing API data
     *                              returned for this Resource.
     */
    function Resource(store, adapter) {
        this.store = store;
        this.adapter = adapter;
        /**
         * Promise library to use throughout the adapter
         */
        this.promise = Promise;
    }
    /**
     * Lifecycle Hooks:
     *
     * * `beforeCreate(payload[, cb])`
     * * `afterCreate(payload[, cb])`
     */
    Resource.prototype.add = function (payload, persistorConfig, adapterConfig) {
        var _this = this;
        if (persistorConfig === void 0) { persistorConfig = {}; }
        if (adapterConfig === void 0) { adapterConfig = {}; }
        return this.promise.all(this.beforeAdd(payload, persistorConfig, adapterConfig))
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            _this.store.dispatch(add_1.add(_this, persistorConfig, adapterConfig));
        })
            .then(function (data) { return _this.afterAdd(data); });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    // beforeAdd(payload: Object, persistorConfig, adapterConfig): Array<Object> {
    Resource.prototype.beforeAdd = function (payload, persistorConfig, adapterConfig) {
        persistorConfig.data = payload;
        return [persistorConfig, adapterConfig];
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterAdd = function (data) {
        return this.promise.all([data]);
    };
    /**
     * Finds a single and puts it into the server store.
     *
     * * `beforeFindOne(payload[, cb])`
     * * `afterFindOne(payload[, cb])`
     */
    Resource.prototype.findOne = function (id, persistorConfig, adapterConfig) {
        var _this = this;
        if (persistorConfig === void 0) { persistorConfig = {}; }
        if (adapterConfig === void 0) { adapterConfig = {}; }
        return this.promise.all(this.beforeFindOne(id, persistorConfig, adapterConfig))
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            return _this.store.dispatch(findOne_1.findOne(_this, persistorConfig, adapterConfig));
        })
            .then(function (data) {
            return _this.afterFindOne(data, adapterConfig);
        });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeFindOne = function (id, persistorConfig, adapterConfig) {
        return [persistorConfig, adapterConfig];
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterFindOne = function (data, adapterConfig) {
        return this.promise.all([data]);
    };
    /**
     * Finds items and puts them into the store.
     *
     * * `beforeFind(payload[, cb])`
     * * `afterFind(payload[, cb])`
     */
    // TODO: Determine if type OR is needed
    Resource.prototype.find = function (persistorConfig, adapterConfig) {
        var _this = this;
        if (persistorConfig === void 0) { persistorConfig = {}; }
        if (adapterConfig === void 0) { adapterConfig = {}; }
        return this.promise.all(this.beforeFind(persistorConfig, adapterConfig))
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            return _this.store.dispatch(find_1.find(_this, persistorConfig, adapterConfig));
        })
            .then(function (data) { return _this.afterFind(data); });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeFind = function (persistorConfig, adapterConfig) {
        return [persistorConfig, adapterConfig];
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterFind = function (data) {
        return this.promise.all([data]);
    };
    /**
     * Lifecycle Hooks:
     *
     * * `beforeUpdate(payload[, cb])`
     * * `afterUpdate(payload[, cb])`
     */
    Resource.prototype.update = function (id, patch, persistorConfig, adapterConfig) {
        var _this = this;
        if (persistorConfig === void 0) { persistorConfig = {}; }
        if (adapterConfig === void 0) { adapterConfig = {}; }
        return this.promise.all(this.beforeUpdate(id, patch, persistorConfig, adapterConfig))
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            return _this.store.dispatch(update_1.update(_this, persistorConfig, adapterConfig));
        })
            .then(function (data) { return _this.afterUpdate(data); });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeUpdate = function (id, patch, persistorConfig, adapterConfig) {
        persistorConfig.data = patch;
        return [persistorConfig, adapterConfig];
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterUpdate = function (data) {
        return this.promise.all([data]);
    };
    /**
     * Removes an item from the store.
     *
     * * `beforeDestroy(payload[, cb])`
     * * `afterDestroy(payload[, cb])`
     */
    Resource.prototype.destroy = function (id, persistorConfig, adapterConfig) {
        var _this = this;
        if (persistorConfig === void 0) { persistorConfig = {}; }
        if (adapterConfig === void 0) { adapterConfig = {}; }
        return this.promise.all(this.beforeDestroy(id, persistorConfig, adapterConfig))
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            return _this.store.dispatch(destroy_1.destroy(_this, persistorConfig, adapterConfig));
        })
            .then(function (_a) {
            var res = _a[0];
            return _this.afterDestroy(res.data);
        });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeDestroy = function (id, persistorConfig, adapterConfig) {
        return [persistorConfig, adapterConfig];
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterDestroy = function (data) {
        return this.promise.all([data]);
    };
    return Resource;
}());
exports.Resource = Resource;
