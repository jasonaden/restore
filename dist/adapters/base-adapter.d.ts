import { Store } from 'redux';
import { IPersistor } from '../persistors/i-persistor';
import { IResourceAdapter } from '../resources/interfaces';
export declare class BaseAdapter implements IResourceAdapter {
    /**
     * Persistor adapter that is used to put and retrieve data. These methods need
     * to be implemented by an adapter that extends the BaseAdapter
     */
    persistor: IPersistor;
    /**
     * Promise library to use throughout the adapter
     */
    promise: PromiseConstructor;
    /**
     * The schemas to use with the adapater
     */
    schema: Object;
    /**
     * The store on which dispatch actions will be called
     */
    store: Store;
    constructor(schema?: Object, store?: Store, persistor?: IPersistor);
    /**
     * generateSlug is used when storing data in the redux store. It's the key by which the data is put into the store.
     */
    generateSlug(entity: any): string;
    findOne(persistorConfig: any, adapterConfig: any): Promise<any[]>;
    beforeFindOne(persistorConfig: any, adapterConfig?: any): any[];
    afterFindOne(data: any, adapterConfig?: any): Promise<any[]>;
    find(persistorConfig: any, adapterConfig: any): Promise<any>;
    beforeFind(persistorConfig: any, adapterConfig: any): any;
    afterFind(data: any, adapterConfig?: any): Promise<any>;
    /**
     * Lifecycle Hooks:
     *
     * * `beforeAdd(payload[, cb])`
     * * `afterAdd(payload[, cb])`
     */
    add(data: any, params?: any): Promise<any>;
    /**
     * Default hook (return what was passed in). Because .all is being used,
     * it's possible that `payload` or `params` could be a promise that returns the
     * payload or params, so it's not a pure identity function.
     */
    beforeAdd(payload: any, params: any): Promise<(any)[]>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterAdd(data: any): Promise<any>;
    update(config: any): Promise<any>;
    beforeUpdate(config: any): Promise<(any)[]>;
    afterUpdate(data: any): Promise<any>;
    destroy(params: any): Promise<any>;
    beforeDestroy(params: any): Promise<(any)[]>;
    afterDestroy(data: any): Promise<any>;
}
