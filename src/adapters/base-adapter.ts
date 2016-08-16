// TODO: Add beforeAny and afterAny that always happens no matter
// what method is called

import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {IPersistor} from '../persistors/i-persistor';
import {IResourceAdapter} from '../resources/interfaces';
import {BasePersistor} from '../persistors/base-persistor';
import { normalize, Schema, arrayOf } from 'normalizr';
import { buildAction, promiseError } from '../utils/index';

import { SET_ONE } from '../resources/constants'; 


/*
* base adapter implementation.
*/
export class BaseAdapter implements IResourceAdapter {
  
  /**
   * Persistor adapter that is used to put and retrieve data. These methods need
   * to be implemented by an adapter that extends the BaseAdapter
   */
  persistor: IPersistor;
  
  /**
   * Promise library to use throughout the adapter
   */
  promise = Promise;

  /**
   * The schemas to use with the adapater
   */
  schema: Object;

  /**
   * The store on which dispatch actions will be called
   */
  store: Store;

  constructor (schema?: Object, store?: Store, persistor?: IPersistor ) {
    
    this.schema = schema ? schema : {};
    this.store = store;
    this.persistor = persistor ? persistor : new BasePersistor();
  }

  /**
   * generateSlug is used when storing data in the redux store. It's the key by which the data is put into the store.
   */
  generateSlug (entity): string {
    return entity.id;
  }

  // with chained error catching
  // need to see about simplifying this and still letting  
  // it catch errors along the way.
  // This sets up a promise chain that: 
  //  1) Passes the received params to beforeFindOne()
  //  2) Passes the beforeFindOne promise to persistor.findOne()
  //  3) Passes the persistor.beforeFineOne promise to afterFindOne()
  //  4) Passes the afterFindOne promise to splitSchema to normalize the data
  findOne (persistorConfig, adapterConfig) {
    return this.promise.all(this.beforeFindOne(persistorConfig, adapterConfig))
      .then( ([persistorConfig, adapterConfig]) => {
        return this.persistor.findOne(persistorConfig);
      }) 
      .then( (res) => {
        return this.afterFindOne(res.data);
      })      
  } 

  // Default version is a no-op that passes along the
  //  params passed in 
  beforeFindOne(persistorConfig, adapterConfig?) {
    return [persistorConfig, adapterConfig];
  }
  
  // Default version is a no-op that passes along the 
  //  persistor's returned promise. 
  afterFindOne(data: any, adapterConfig?:any): Promise<any[]> {
    return this.promise.all([data]);
  }

  find (persistorConfig, adapterConfig) {
    return this.promise.all(this.beforeFind(persistorConfig, adapterConfig))
    .then( ([persistorConfig, adapterConfig]) => { 
      return this.persistor.find(persistorConfig) 
    })
    .then( (res) => this.afterFind(res.data, adapterConfig) )
  }


  beforeFind(persistorConfig, adapterConfig): any {
    return [persistorConfig, adapterConfig];
  }
  
  afterFind(data: any, adapterConfig?:any): Promise<any> {
    return Promise.resolve(data);
  }
  /**
   * Lifecycle Hooks:
   * 
   * * `beforeAdd(payload[, cb])`
   * * `afterAdd(payload[, cb])`
   */
  add(persistorConfig, adapterConfig): Promise<any> {
    return this.promise.all(this.beforeAdd(persistorConfig, adapterConfig)) // run before hook
    .then(([persistorConfig, adapterConfig]) => this.persistor.create(persistorConfig)) // persist
    .then(res => this.afterAdd(res.data)); // run after hook
  }
  
  /**
   * Default hook (return what was passed in). Because .all is being used, 
   * it's possible that `payload` or `params` could be a promise that returns the 
   * payload or params, so it's not a pure identity function.
   */
  beforeAdd(persistorConfig, adapterConfig): Promise<(any)[]> {
    return [persistorConfig, adapterConfig];
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterAdd(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  update (persistorConfig, adapterConfig) {
    return this.promise.all(this.beforeUpdate(persistorConfig, adapterConfig))
    .then(([persistorConfig, adapterConfig]) => {
      return this.persistor.update(persistorConfig);
    })
    .then(res => this.afterUpdate(res.data));
  }

  beforeUpdate(persistorConfig, adapterConfig): any {
    return [persistorConfig, adapterConfig];
  }
  
  afterUpdate(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  destroy (id, persistorConfig, adapterConfig) {
    return this.promise.all(this.beforeDestroy(id, persistorConfig, adapterConfig))
    .then(([persistorConfig, adapterConfig]) => this.persistor.destroy(persistorConfig))
    .then(x => this.afterDestroy(x));
  }

  beforeDestroy(persistorConfig, adapterConfig):any {
    return [persistorConfig, adapterConfig];
  }
  
  afterDestroy(data: any): Promise<any> {
    return Promise.resolve(data);
  }

}

