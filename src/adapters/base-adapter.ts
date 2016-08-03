// TODO: Add beforeAny and afterAny that always happens no matter
// what method is called

import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {IPersistor} from '../persistors/i-persistor';
import {IResourceAdapter} from '../resources/interfaces';
import {BasePersistor} from '../persistors/base-persistor';
import { normalize, Schema, arrayOf } from 'normalizr';
import { buildAction } from '../utils/buildAction';


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

  // Use the passed-in schema to split out the data
  splitSchema( data ) {
    // TODO: if needed handle case where array of items returned. 
    if( Array.isArray(data) ) {


    // got an individual item
    } else {

      let type = data._links.self.class;
      let split = normalize( data, this.schema[type] )   

      for( let key of Object.getOwnPropertyNames(split.entities) ) {
        // console.log("built action", buildAction('FOUND', key.toUpperCase(), split.entities[key]))
        // this.store.dispatch( buildAction('FOUND', key.toUpperCase(), split.entities[key]) )
      }

      return split; 
    } 
  }

  // Override before* or after* as needed in specific adapters.  
  findOne (params) {
    return this.promise.resolve(this.beforeFindOne(params))
    .then( (beforePromise) => {
      return this.persistor.findOne(beforePromise);
    })
    .then( (persistorPromise) => {
      return this.afterFindOne(persistorPromise)
    })
    // Normalizes the data
    .then( (afterPromise) => {
      if( Object.keys(this.schema).length ) {
        return this.promise.resolve( this.splitSchema( afterPromise ) );
      } else {
        return this.promise.resolve(afterPromise);
      }
    })
  }

  // Default version passes along the params
  beforeFindOne(params): Promise<(any)> {
    // Do any before work and return a resolved promise with 
    //  the params, data or whatever (default is the params) 
    return this.promise.resolve(params);
  }
  
  // Default version is a no-op that passes along the 
  //  persistor's returned promise. 
  afterFindOne(persistorPromise: any): Promise<any> {
    return this.promise.resolve(persistorPromise);
  }

  /* TODO: Original version that uses promise.all() to build the chain.
  * Need to find out if there is a use case that requires this or if we 
  * can just build the chain with resolves. Remove this when done. 
  findOne (params) {

    return this.promise.all([this.beforeFindOne(params)])
    .then( (params) => {
      console.log("in base-adapter about t call persistor.findOne", params[0])
      return this.persistor.findOne(params[0]);
    })
    .then( (data) => {
      this.afterFindOne(data)
    });
  }
  beforeFindOne(params): Promise<(any)[]> {
    console.log("in beforeFindOne, params = ", params);
 
    return this.promise.resolve(params);

    // return this.promise.all([params]);
  }
  afterFindOne(data: any): Promise<any> {
    console.log("in the afterFindOne", data);
    return Promise.resolve(data);
  }
  */

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

