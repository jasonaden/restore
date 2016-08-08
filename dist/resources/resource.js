"use strict";
var Immutable = require('immutable');
var add_1 = require('../actions/add');
var findOne_1 = require('../actions/findOne');
var destroy_1 = require('../actions/destroy');
var update_1 = require('../actions/update');
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
    function Resource(store, adapter, schema) {
        this.store = store;
        this.adapter = adapter;
        this.schema = schema;
        /**
         * Promise library to use throughout the adapter
         */
        // TODO: Move to constructor? So it can be there when creating the resource instance.
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
    Resource.prototype.add = function (payload, config) {
        var _this = this;
        return this.promise.all([this.beforeAdd(payload, config)])
            .then(function (_a) {
            var payload = _a[0], config = _a[1];
            return _this.store.dispatch(add_1.add(payload, config));
        })
            .then(function (_a) {
            var data = _a[0];
            return _this.afterAdd(data);
        });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeAdd = function (payload, config) {
        return this.promise.all([payload, config]);
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterAdd = function (data) {
        return this.promise.all([data]);
    };
    /**
     * Lifecycle Hooks:
     *
     * * `beforeUpdate(payload[, cb])`
     * * `afterUpdate(payload[, cb])`
     */
    // TODO: Create the update() action creator
    Resource.prototype.update = function (payload, config) {
        var _this = this;
        return this.promise.all([this.beforeUpdate(payload, config)])
            .then(function (_a) {
            var payload = _a[0], config = _a[1];
            return _this.store.dispatch(update_1.update(payload, config));
        })
            .then(function (_a) {
            var data = _a[0];
            return _this.afterUpdate(data);
        });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeUpdate = function (payload, config) {
        return this.promise.all([payload, config]);
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
    Resource.prototype.destroy = function (id, config) {
        var _this = this;
        return this.promise.all([this.beforeDestroy(id, config)])
            .then(function (args) { return _this.store.dispatch(destroy_1.destroy(id, config)); })
            .then(function (data) { return _this.afterDestroy(data); });
    };
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
     * Finds a single and puts it into the store.
     *
     * * `beforeFindOne(payload[, cb])`
     * * `afterFindOne(payload[, cb])`
     */
    // TODO: Fix findOne()
    Resource.prototype.findOne = function (id, config) {
        var _this = this;
        return this.promise.all([this.beforeFindOne(id, config)])
            .then(function (_a) {
            var id = _a[0], config = _a[1];
            return _this.store.dispatch(findOne_1.findOne(id, config));
        })
            .then(function (_a) {
            var data = _a[0];
            return _this.afterFindOne(data);
        });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeFindOne = function (id, config) {
        return this.promise.all([id, config]);
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterFindOne = function (data) {
        return this.promise.all([data]);
    };
    return Resource;
}());
exports.Resource = Resource;
