"use strict";
var Immutable = require('immutable');
var findOne_1 = require('../actions/findOne');
var find_1 = require('../actions/find');
var resource_reducer_1 = require('../reducers/resource-reducer');
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
    Object.defineProperty(Resource.prototype, "state", {
        get: function () {
            return this._state[this.className.toLowerCase()] || new resource_reducer_1.defaultEntityState();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Resource.prototype, "_state", {
        get: function () {
            return this.store.getState().entities || Immutable.Map();
        },
        enumerable: true,
        configurable: true
    });
    // TODO: ADD METHODS TO GET DATA OUT OF THE RESOURCE.
    /**
     * Check whether this resource type is loading or optionally a specific resource.
     *
     * Example:
     *
     * ```
     * Case.isLoading(); // Checks whether loadMany is being run
     *
     * Case.isLoading(5); // Checks whether we are fetching a specific case
     * ```
     */
    Resource.prototype.isLoading = function (id) {
        // Check by ID
        if (id) {
            return false;
        }
        else {
            var s = this.state;
            return !!(s.adding || s.deleting || s.loadingMany || s.loadingOne || s.patching);
        }
    };
    /**
     * Lifecycle Hooks:
     *
     * * `beforeCreate(payload[, cb])`
     * * `afterCreate(payload[, cb])`
     */
    // add(payload: T, config?: any): PromiseLike<any[]> {
    //   return this.promise.all([this.beforeAdd(payload, config)])
    //   .then(([payload, config]) => this.store.dispatch(add(payload, config)))
    //   .then(([data]) => this.afterAdd(data));
    // }
    /**
     * Default identity hook (return what was passed in)
     */
    // beforeAdd(payload: T, config?: any): PromiseLike<any[]> {
    //   return this.promise.all([payload, config]);
    // }
    /**
     * Default identity hook (return what was passed in)
     */
    // afterAdd(data: any): PromiseLike<any[]> {
    //   return this.promise.all([data]);
    // }
    /**
     * Lifecycle Hooks:
     *
     * * `beforeUpdate(payload[, cb])`
     * * `afterUpdate(payload[, cb])`
     */
    // update(id:number, patch: T, persistorConfig, adapterConfig?: any): PromiseLike<any[]> {
    //   return this.promise.all([this.beforeUpdate(id, patch, persistorConfig, adapterConfig)])
    //   .then(([config]) => this.store.dispatch(update(this, persistorConfig, adapterConfig)))
    //   .then((data) => this.afterUpdate(data));
    // }
    /**
     * Default identity hook (return what was passed in)
     */
    // beforeUpdate(id: number, patch: T, persistorConfig, adapterConfig?: any) {
    //   persistorConfig.data = patch;
    //   return [persistorConfig, adapterConfig];
    // }
    /**
     * Default identity hook (return what was passed in)
     */
    // afterUpdate(data: any): PromiseLike<any[]> {
    //   return this.promise.all([data]);
    // }
    /**
     * Removes an item from the store.
     *
     * * `beforeDestroy(payload[, cb])`
     * * `afterDestroy(payload[, cb])`
     */
    // destroy(id: string | number, config?: any): PromiseLike<any[]> {
    //   return this.promise.all([this.beforeDestroy(id, config)])
    //   .then(args => this.store.dispatch(destroy(id, config)))
    //   .then(data => this.afterDestroy(data));
    // }
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeDestroy = function (id, config) {
        return this.promise.all([config]);
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterDestroy = function (data) {
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
        return this.promise.all([this.beforeFindOne(id, persistorConfig, adapterConfig)])
            .then(function (_a) {
            var persistorConfig = _a[0], adapterConfig = _a[1];
            return _this.store.dispatch(findOne_1.findOne(_this, persistorConfig, adapterConfig));
        })
            .then(function (data) { return _this.afterFindOne(data); });
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
    Resource.prototype.afterFindOne = function (data) {
        console.log("Resource afterFindOne");
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
    return Resource;
}());
exports.Resource = Resource;
