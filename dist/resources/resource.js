import { find } from '../actions/find';
import { findOne } from '../actions/findOne';
import { destroy } from '../actions/destroy';
import { action } from '../actions/action';
import { ADD, UPDATE, REFRESH } from './constants';
/**
 *
 */
export class Resource {
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
    constructor($ngRedux, $http, $q, adapter, schema) {
        this.adapter = adapter;
        this.schema = schema;
        this.store = $ngRedux;
        this.$http = $http;
        this.$q = $q;
    }
    get state() {
        return this._state[this.className.toLowerCase()] || {};
    }
    ;
    get _state() {
        return this.store.getState().entities || {};
    }
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
    isLoading(id) {
        // Check by ID
        if (id) {
            return false;
        }
        else {
            let s = this.state;
            return !!(s.adding || s.deleting || s.loadingMany || s.loadingOne || s.patching);
        }
    }
    /**
     * Lifecycle Hooks:
     *
     * * `beforeCreate(payload[, cb])`
     * * `afterCreate(payload[, cb])`
     */
    add(payload, config) {
        return this.$q.when(this.beforeAdd(payload, config))
            .then(args => this.store.dispatch(add(this, payload, config)))
            .then(data => this.afterAdd(data));
    }
    /**
     * Default identity hook (return what was passed in)
     */
    beforeAdd(payload, config) {
        return this.$q.when(config).then(config => [payload, config]);
    }
    /**
     * Default identity hook (return what was passed in)
     */
    afterAdd(data) {
        return this.$q.when(data);
    }
    /**
     * Lifecycle Hooks:
     *
     * * `beforeUpdate(payload[, cb])`
     * * `afterUpdate(payload[, cb])`
     */
    update(payload) {
        return action(UPDATE, this.className, payload);
    }
    /**
     * Default identity hook (return what was passed in)
     */
    beforeUpdate(config) {
        return this.$q.when(config);
    }
    /**
     * Default identity hook (return what was passed in)
     */
    afterUpdate(data) {
        return this.$q.when(data);
    }
    /**
     * Saves data. Will determine whether to create or update.
     *
     * For Lifecycle hooks, see `add` or `update`.
     */
    save(payload) {
        return action(ADD, this.className, payload);
    }
    /**
     * Removes an item from the store.
     *
     * * `beforeDestroy(payload[, cb])`
     * * `afterDestroy(payload[, cb])`
     */
    destroy(payload, config) {
        let id = this.adapter.generateSlug(payload);
        return this.$q.when(this.beforeDestroy(id, config))
            .then(args => this.store.dispatch(destroy(this, id, config)))
            .then(data => this.afterFind(data));
    }
    /**
     * Default identity hook (return what was passed in)
     */
    beforeDestroy(id, config) {
        return this.$q.when(config);
    }
    /**
     * Default identity hook (return what was passed in)
     */
    afterDestroy(data) {
        return this.$q.when(data);
    }
    /**
     * Finds items and puts them into the store.
     *
     * * `beforeFind(payload[, cb])`
     * * `afterFind(payload[, cb])`
     */
    find(args) {
        return this.$q.when(this.beforeFind(args))
            .then(args => this.store.dispatch(find(this, args)))
            .then(data => this.afterFind(data));
    }
    /**
     * Default identity hook (return what was passed in)
     */
    beforeFind(config) {
        return this.$q.when(config);
    }
    /**
     * Default identity hook (return what was passed in)
     */
    afterFind(data) {
        return this.$q.when(data);
    }
    /**
     * Finds a single and puts it into the store.
     *
     * * `beforeFindOne(payload[, cb])`
     * * `afterFindOne(payload[, cb])`
     */
    findOne(id, config) {
        return this.$q.when(this.beforeFindOne(id, config))
            .then(args => this.store.dispatch(findOne(this, args)))
            .then(data => this.afterFindOne(data));
    }
    /**
     * Default identity hook (return what was passed in)
     */
    beforeFindOne(id, config) {
        return this.$q.when(config);
    }
    /**
     * Default identity hook (return what was passed in)
     */
    afterFindOne(data) {
        return this.$q.when(data);
    }
    reloadMany() {
        this.store.dispatch(action(REFRESH, this.className, []));
        this.find();
    }
}
