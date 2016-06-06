"use strict";
var Immutable = require('immutable');
var find_1 = require('../actions/find');
var findOne_1 = require('../actions/findOne');
var destroy_1 = require('../actions/destroy');
var action_1 = require('../actions/action');
var constants_1 = require('./constants');
var resource_reducer_1 = require('./resource-reducer');
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
    function Resource($ngRedux, $http, $q, adapter, schema) {
        this.adapter = adapter;
        this.schema = schema;
        this.store = $ngRedux;
        this.$http = $http;
        this.$q = $q;
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
        return this.$q.when(this.beforeAdd(payload, config))
            .then(function (args) { return _this.store.dispatch(add(_this, payload, config)); })
            .then(function (data) { return _this.afterAdd(data); });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeAdd = function (payload, config) {
        return this.$q.when(config).then(function (config) { return [payload, config]; });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterAdd = function (data) {
        return this.$q.when(data);
    };
    /**
     * Lifecycle Hooks:
     *
     * * `beforeUpdate(payload[, cb])`
     * * `afterUpdate(payload[, cb])`
     */
    Resource.prototype.update = function (payload) {
        return action_1.action(constants_1.UPDATE, this.className, payload);
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeUpdate = function (config) {
        return this.$q.when(config);
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterUpdate = function (data) {
        return this.$q.when(data);
    };
    /**
     * Saves data. Will determine whether to create or update.
     *
     * For Lifecycle hooks, see `add` or `update`.
     */
    Resource.prototype.save = function (payload) {
        return action_1.action(constants_1.ADD, this.className, payload);
    };
    /**
     * Removes an item from the store.
     *
     * * `beforeDestroy(payload[, cb])`
     * * `afterDestroy(payload[, cb])`
     */
    Resource.prototype.destroy = function (payload, config) {
        var _this = this;
        var id = this.adapter.generateSlug(payload);
        return this.$q.when(this.beforeDestroy(id, config))
            .then(function (args) { return _this.store.dispatch(destroy_1.destroy(_this, id, config)); })
            .then(function (data) { return _this.afterFind(data); });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeDestroy = function (id, config) {
        return this.$q.when(config);
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterDestroy = function (data) {
        return this.$q.when(data);
    };
    /**
     * Finds items and puts them into the store.
     *
     * * `beforeFind(payload[, cb])`
     * * `afterFind(payload[, cb])`
     */
    Resource.prototype.find = function (args) {
        var _this = this;
        return this.$q.when(this.beforeFind(args))
            .then(function (args) { return _this.store.dispatch(find_1.find(_this, args)); })
            .then(function (data) { return _this.afterFind(data); });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeFind = function (config) {
        return this.$q.when(config);
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterFind = function (data) {
        return this.$q.when(data);
    };
    /**
     * Finds a single and puts it into the store.
     *
     * * `beforeFindOne(payload[, cb])`
     * * `afterFindOne(payload[, cb])`
     */
    Resource.prototype.findOne = function (id, config) {
        var _this = this;
        return this.$q.when(this.beforeFindOne(id, config))
            .then(function (args) { return _this.store.dispatch(findOne_1.findOne(_this, id)); })
            .then(function (data) { return _this.afterFindOne(data); });
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.beforeFindOne = function (id, config) {
        return this.$q.when(config);
    };
    /**
     * Default identity hook (return what was passed in)
     */
    Resource.prototype.afterFindOne = function (data) {
        return this.$q.when(data);
    };
    Resource.prototype.reloadMany = function () {
        this.store.dispatch(action_1.action(constants_1.REFRESH, this.className, []));
        this.find();
    };
    return Resource;
}());
exports.Resource = Resource;
