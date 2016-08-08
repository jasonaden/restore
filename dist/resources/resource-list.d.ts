import { IResourceAdapter } from './interfaces';
/**
 *
 */
export declare class ResourceList<T> {
    listKey: string;
    store: any;
    adapter: IResourceAdapter;
    baseUrl: string;
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
    constructor(listKey: string, store: any, adapter: IResourceAdapter);
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
    isLoading(): any;
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
    find(config: any): PromiseLike<any[]> | Promise<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    beforeFind(config?: any): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterFind(data: any): PromiseLike<any[]>;
}
