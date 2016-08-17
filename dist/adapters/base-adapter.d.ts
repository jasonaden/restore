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
    findOne(persistorConfig: Object, adapterConfig?: Object): Promise<any> | PromiseLike<any>;
    beforeFindOne(persistorConfig: Object, adapterConfig?: Object): Array<Object>;
    afterFindOne(data: any, adapterConfig?: Object): Promise<any[]>;
    find(persistorConfig: Object, adapterConfig: Object): Promise<any> | PromiseLike<any>;
    beforeFind(persistorConfig: Object, adapterConfig: Object): Array<Object>;
    afterFind(data: any, adapterConfig: Object): Promise<any>;
    add(persistorConfig: Object, adapterConfig?: Object): Promise<any> | PromiseLike<any>;
    /**
     * Default hook (return what was passed in). Because .all is being used,
     * it's possible that `payload` or `params` could be a promise that returns the
     * payload or params, so it's not a pure identity function.
     */
    beforeAdd(persistorConfig: Object, adapterConfig?: Object): Array<Object>;
    /**
     * Default identity hook (return what was passed in)
     */
    afterAdd(data: any): Promise<any>;
    update(persistorConfig: Object, adapterConfig?: Object): Promise<any> | PromiseLike<any>;
    beforeUpdate(persistorConfig: Object, adapterConfig?: Object): Array<Object>;
    afterUpdate(data: any): Promise<any>;
    destroy(persistorConfig: Object, adapterConfig?: Object): Promise<any> | PromiseLike<any>;
    beforeDestroy(persistorConfig: Object, adapterConfig?: Object): Array<Object>;
    afterDestroy(data: any): Promise<any>;
}
