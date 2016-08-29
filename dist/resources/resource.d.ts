import { IResourceAdapter, IPersistorConfig, IAdapterConfig } from './interfaces';
/**
 *
 */
export declare class Resource {
    store: any;
    adapter: IResourceAdapter;
    url: string;
    className: string;
    /**
     * Promise library to use throughout the adapter
     */
    promise: PromiseConstructor;
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
     * Lifecycle Hooks:
     *
     * * `beforeCreate(payload[, cb])`
     * * `afterCreate(payload[, cb])`
     */
    add(payload: Object, persistorConfig?: IPersistorConfig, adapterConfig?: IAdapterConfig): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    beforeAdd(payload: Object, persistorConfig: IPersistorConfig, adapterConfig?: IAdapterConfig): Array<any>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterAdd(data: any): PromiseLike<any[]>;
    /**
     * Finds a single and puts it into the server store.
     *
     * * `beforeFindOne(payload[, cb])`
     * * `afterFindOne(payload[, cb])`
     */
    findOne(id: (number | string), persistorConfig?: IPersistorConfig, adapterConfig?: IAdapterConfig): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    beforeFindOne(id: (number | string), persistorConfig: IPersistorConfig, adapterConfig?: IAdapterConfig): Array<any>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterFindOne(data: any, adapterConfig?: Object): (PromiseLike<any[]>);
    /**
     * Finds items and puts them into the store.
     *
     * * `beforeFind(payload[, cb])`
     * * `afterFind(payload[, cb])`
     */
    find(persistorConfig?: IPersistorConfig, adapterConfig?: IAdapterConfig): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    beforeFind(persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig): Array<any>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterFind(data: any): any;
    /**
     * Lifecycle Hooks:
     *
     * * `beforeUpdate(payload[, cb])`
     * * `afterUpdate(payload[, cb])`
     */
    update(id: number, patch: Object, persistorConfig?: IPersistorConfig, adapterConfig?: IAdapterConfig): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    beforeUpdate(id: number, patch: Object, persistorConfig: IPersistorConfig, adapterConfig?: IAdapterConfig): Array<any>;
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
    destroy(id: string | number, persistorConfig?: IPersistorConfig, adapterConfig?: IAdapterConfig): PromiseLike<any[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    beforeDestroy(id: string | number, persistorConfig: IPersistorConfig, adapterConfig?: IAdapterConfig): Array<any>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterDestroy(data: any): PromiseLike<any[]>;
}
