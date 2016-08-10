"use strict";
var Immutable = require('immutable');
var resource_list_reducer_1 = require('../reducers/resource-list-reducer');
var find_1 = require('../actions/find');
/**
 *
 */
var ResourceList = (function () {
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
    function ResourceList(listName, store, adapter) {
        this.listName = listName;
        this.store = store;
        this.adapter = adapter;
        /**
         * Promise library to use throughout the adapter
         */
        // TODO: Move to constructor? So it can be there when creating the resource instance.
        this.promise = Promise;
    }
    Object.defineProperty(ResourceList.prototype, "state", {
        get: function () {
            return this._state[this.listName.toLowerCase()] || new resource_list_reducer_1.defaultListState();
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ResourceList.prototype, "_state", {
        get: function () {
            return this.store.getState() || Immutable.Map();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check whether this resource list is loading.
     *
     * Example:
     *
     * ```
     * CaseList.isLoading(); // Checks whether loadMany is being run
     *
     * ```
     */
    ResourceList.prototype.isLoading = function () {
        return this._state.loading;
    };
    /**
    declare type ActionConfig = {
     adapter: IResourceAdapter,
     adapterConfig?: any,
     schema: any,
     className: string,
     promise: PromiseConstructor
    }*/
    /**
     * Finds items and puts them into the store.
     *
     * * `beforeFind(payload[, cb])`
     * * `afterFind(payload[, cb])`
     */
    // TODO: Determine if type OR is needed
    ResourceList.prototype.find = function (config) {
        var _this = this;
        return this.promise.all([this.beforeFind(config)])
            .then(function (_a) {
            var config = _a[0];
            debugger;
            _this.store.dispatch(find_1.find(_this, config[0]));
        })
            .then(function (_a) {
            var data = _a[0];
            return _this.afterFind(data);
        });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    ResourceList.prototype.beforeFind = function (config) {
        return this.promise.all([config]);
    };
    /**
     * Default identity hook (return what was passed in)
     */
    ResourceList.prototype.afterFind = function (data) {
        return this.promise.all([data]);
    };
    return ResourceList;
}());
exports.ResourceList = ResourceList;
