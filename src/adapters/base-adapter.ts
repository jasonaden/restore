// TODO: Add beforeAny and afterAny that always happens no matter
// what method is called

import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {IPersistor} from '../persistors/i-persistor';
import {IResourceAdapter} from '../resources/interfaces';
import {BasePersistor} from '../persistors/base-persistor';
import { normalize, Schema, arrayOf } from 'normalizr';
import { buildAction, promiseError } from '../utils/index';

import { FOUND } from '../resources/constants'; 


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

  // TODO: The following is a placeholder for a static Resource
  //  method or something outside the adapter that will be invoked by the adapter
  //  and handed the normalized data. It takes the normalized 
  //  data and dispatches appropriate Redux actions to update
  //  the store. 
  handleAdapterData( store, split ) {
      for( let key of Object.getOwnPropertyNames(split.entities) ) {
        this.store.dispatch( buildAction(FOUND, key.toUpperCase(), split.entities[key]) );
      }
  }


  // Use the passed-in schema to split out the data
  splitSchema( data ): Promise<any[]> {
    // if we recieve a single item
    let type = (data._links && data._links.self.class) || undefined;

    // Specify the schema for other types of things
    if( ! type ) {
      // schema for /api/v2/changes
      if( data.changed ) {
        type = 'changes'
      }
    }

    // Reject if no schema match
    if( ! this.schema[type] ) {
      this.promise.reject(`No schema exists for: ${type}`)
    }

    let split = normalize( data, this.schema[type] )   

    this.handleAdapterData(this.store, split);

    return this.promise.all([split]); 
  }

  // with chained error catching
  // need to see about simplifying this and still letting  
  // it catch errors along the way.
  // This sets up a promise chain that: 
  //  1) Passes the received params to beforeFindOne()
  //  2) Passes the beforeFindOne promise to persistor.findOne()
  //  3) Passes the persistor.beforeFineOne promise to afterFindOne()
  //  4) Passes the afterFindOne promise to splitSchema to normalize the data
  findOne (config) {
    return this.beforeFindOne(config)
      .then( (beforePromise) => {
        let [config] = beforePromise;
        return this.persistor.findOne(config);
      }) 

      .then( (persistorPromise) => {
        let [data] = persistorPromise;
        return this.afterFindOne(data);
      })      
     
      // Normalize the data
      .then( 
        (afterPromise) => {
          let [data] = afterPromise;
          if( Object.keys(this.schema).length ) {
            return this.splitSchema( data )
          } else {
            return this.promise.all( [data] )
          }
        }, 
        (err) => {
          // TODO: Need to use some general error handler
          return this.promise.reject("findOne failed " + err)
        }
      )
  } 

  // Default version is a no-op that passes along the
  //  params passed in 
  beforeFindOne(params): Promise<any[]> {
    return this.promise.all([params]);
  }
  
  // Default version is a no-op that passes along the 
  //  persistor's returned promise. 
  afterFindOne(data: any): Promise<any[]> {
    return this.promise.all([data]);
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

