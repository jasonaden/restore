import { IResourceAdapter, IResourceRequestConfig } from './interfaces';
/**
 *
 */
export declare class Resource<T> {
    store: any;
    adapter: IResourceAdapter;
    url: string;
    baseUrl: string;
    className: string;
    /**
     * Promise library to use throughout the adapter
     */
    promise: PromiseConstructor;
    state: any;
    private _state;
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
    constructor(store: any, adapter: IResourceAdapter);
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
    isLoading(id?: string | number): boolean;
    /**
     * Lifecycle Hooks:
     *
     * * `beforeCreate(payload[, cb])`
     * * `afterCreate(payload[, cb])`
     */
    add(payload: T, config?: any): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    beforeAdd(payload: T, config?: any): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterAdd(data: any): PromiseLike<any[]>;
    /**
     * Lifecycle Hooks:
     *
     * * `beforeUpdate(payload[, cb])`
     * * `afterUpdate(payload[, cb])`
     */
    update(payload: T, config?: any): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    beforeUpdate(payload: T, config?: any): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterUpdate(data: any): PromiseLike<any[]>;
    /**
     * Removes an item from the store.
     *
     * * `beforeDestroy(payload[, cb])`
     * * `afterDestroy(payload[, cb])`
     */
    destroy(id: string | number, config?: any): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    beforeDestroy(id: string | number, config?: any): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterDestroy(data: any): PromiseLike<any[]>;
    /**
     * Finds a single and puts it into the store.
     *
     * * `beforeFindOne(payload[, cb])`
     * * `afterFindOne(payload[, cb])`
     */
    findOne(id: number, config?: any): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    beforeFindOne(id: number, config?: IResourceRequestConfig): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterFindOne(data: any): PromiseLike<any[]>;
}
