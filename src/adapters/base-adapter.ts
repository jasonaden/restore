// TODO: Add beforeAny and afterAny that always happens no matter
// what method is called

import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {IPersistor} from '../persistors/i-persistor';
import {IResourceAdapter,
  IPersistorConfig,
  IAdapterConfig} from '../resources/interfaces';
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

  // This sets up promise chains that: 
  //  1) Pass the received configurations to beforeFindOne() which returns an array
  //  2) Pass the beforeFindOne array to persistor.findOne() which returns a promise
  //  3) Pass the persistor.beforeFineOne promise to afterFindOne() which return a promise

  // ******* FINDONE ********* //
  findOne (persistorConfig: IPersistorConfig, adapterConfig?: IAdapterConfig): PromiseLike<any> {
    return this.promise.all(this.beforeFindOne(persistorConfig, adapterConfig))
      .then( ([persistorConfig, adapterConfig]) => {
        return this.persistor.findOne(persistorConfig);
      }) 
      .then( (res) => {
        return this.afterFindOne(res.data, adapterConfig);
      })
      // .then( null,
      //   // TODO: We probably need to add some kind of logging here
      //   //  to log failures 
      //   (err) => {
      //     return Promise.reject(err);
      //   })    
  } 

  // Default version is a no-op that passes along the
  //  params passed in 
  beforeFindOne(persistorConfig:Object, adapterConfig?: Object): Array<Object> {
    return [persistorConfig, adapterConfig];
  }
  
  // Default version is a no-op that passes along the 
  //  persistor's returned promise. 
  afterFindOne(data: any, adapterConfig?: Object): PromiseLike<any[]> {
    return this.promise.all([data]);
  }

  // ******* FIND ********* //
  find (persistorConfig:Object, adapterConfig:Object): Promise<any> | PromiseLike<any> {
    return this.promise.all(this.beforeFind(persistorConfig, adapterConfig))
    .then( ([persistorConfig, adapterConfig]) => { 
      return this.persistor.find(persistorConfig) 
    })
    .then( (res) => this.afterFind(res.data, adapterConfig) )
  }
  beforeFind(persistorConfig:Object, adapterConfig:Object): Array<Object> {
    return [persistorConfig, adapterConfig];
  }
  afterFind(data: any, adapterConfig: Object): Promise<any> {
    return Promise.resolve(data);
  }

  // ******* ADD ********* //
  add(persistorConfig:Object, adapterConfig?:Object): Promise<any> | PromiseLike<any> {
    return this.promise.all(this.beforeAdd(persistorConfig, adapterConfig)) // run before hook
    .then(([persistorConfig, adapterConfig]) => this.persistor.create(persistorConfig)) // persist
    .then(res => this.afterAdd(res.data)); // run after hook
  }
  
  /**
   * Default hook (return what was passed in). Because .all is being used, 
   * it's possible that `payload` or `params` could be a promise that returns the 
   * payload or params, so it's not a pure identity function.
   */
  beforeAdd(persistorConfig: Object, adapterConfig?: Object): Array<Object> {
    return [persistorConfig, adapterConfig];
  }
  /**
   * Default identity hook (return what was passed in)
   */
  afterAdd(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  // ******* UPDATE ********* //
  update (persistorConfig: Object, adapterConfig?: Object): Promise<any> | PromiseLike<any> {
    return this.promise.all(this.beforeUpdate(persistorConfig, adapterConfig))
    .then(([persistorConfig, adapterConfig]) => {
      return this.persistor.update(persistorConfig);
    })
    .then(res => this.afterUpdate(res.data));
  }

  beforeUpdate(persistorConfig: Object, adapterConfig?: Object): Array<Object> {
    return [persistorConfig, adapterConfig];
  }
  
  afterUpdate(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  // ******* DESTROY ********* //
  destroy (persistorConfig: Object, adapterConfig?: Object): Promise<any> | PromiseLike<any> {
    return this.promise.all( this.beforeDestroy(persistorConfig, adapterConfig) )
    .then(([persistorConfig, adapterConfig]) => this.persistor.destroy(persistorConfig))
    .then(x => this.afterDestroy(x));
  }

  beforeDestroy(persistorConfig: Object, adapterConfig?: Object): Array<Object> {
    return [persistorConfig, adapterConfig];
  }
  
  afterDestroy(data: any): Promise<any> {
    return Promise.resolve(data);
  }

}

