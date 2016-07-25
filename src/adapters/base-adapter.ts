// TODO: Add beforeAny and afterAny that always happens no matter
// what method is called


import {IAdapterPersistor} from '../persistors/i-adapter-persistor';
import {IResourceAdapter} from '../resources/interfaces';
import {BaseAdapterPersistor} from '../persistors/base-adapter-persistor';

/*
* base adapter implementation.
*/
export class BaseAdapter implements IResourceAdapter {
  
  /**
   * Persistor adapter that is used to put and retrieve data. These methods need
   * to be implemented by an adapter that extends the BaseAdapter
   */
  persistor: IAdapterPersistor;
  
  /**
   * Promise library to use throughout the adapter
   */
  promise = Promise;

  constructor (persistor?: IAdapterPersistor) {
    this.persistor = persistor ? persistor : new BaseAdapterPersistor();
  }

  /**
   * generateSlug is used when storing data in the redux store. It's the key by which the data is put into the store.
   */
  generateSlug (entity): string {
    return entity.id;
  }
    
  /**
   * Lifecycle Hooks:
   * 
   * * `beforeAdd(payload[, cb])`
   * * `afterAdd(payload[, cb])`
   */
  add(data, params?): Promise<any> {
    return this.beforeAdd(data, params) // run before hook
    .then(([data, params]) => this.persistor.create(data, params)) // persist
    .then(x => this.afterAdd(x)); // run after hook
  }
  
  /**
   * Default hook (return what was passed in). Because .all is being used, 
   * it's possible that `payload` or `params` could be a promise that returns the 
   * payload or params, so it's not a pure identity function.
   */
  beforeAdd(payload, params): Promise<(any)[]> {
    return this.promise.all([payload, params]);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterAdd(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  find (params?) {
    return this.promise.all([this.beforeFind(params)])
    .then(([params]) => this.persistor.find(params))
    .then(x => this.afterFind(x));
  }

  beforeFind(params?): Promise<(any)[]> {
    return this.promise.all([params]);
  }
  
  afterFind(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  findOne (params) {
    return this.promise.all([this.beforeFindOne(params)])
    .then(([params]) => this.persistor.findOne(params))
    .then(x => this.afterFindOne(x));
  }

  beforeFindOne(params): Promise<(any)[]> {
    return this.promise.all([params]);
  }
  
  afterFindOne(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  update (data, params?) {
    return this.beforeUpdate(data, params)
    .then(([data, config]) => this.persistor.update(data, config))
    .then(x => this.afterUpdate(x));
  }

  beforeUpdate(data, params?): Promise<(any)[]> {
    return this.promise.all([data, params]);
  }
  
  afterUpdate(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  destroy (params) {
    return this.beforeDestroy(params)
    .then(([params]) => this.persistor.destroy(params))
    .then(x => this.afterDestroy(x));
  }

  beforeDestroy(params): Promise<(any)[]> {
    return this.promise.all([params]);
  }
  
  afterDestroy(data: any): Promise<any> {
    return Promise.resolve(data);
  }

}

