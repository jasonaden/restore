import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import { normalize, Schema, arrayOf } from 'normalizr';
import * as Immutable from 'immutable';
import {identity} from 'lodash';

import {IResourceAdapter,
  IResourceRequestConfig, 
  IEntityState, 
  IPersistorConfig, 
  IAdapterConfig} from './interfaces';

import {add} from '../actions/add';
import {findOne} from '../actions/findOne';
import {find} from '../actions/find';
import {destroy} from '../actions/destroy';
import {update} from '../actions/update';

import {defaultEntityState} from '../reducers/resource-reducer';

/**
 * 
 */
export class Resource {
  
  public url: string;
  public className: string;

  /**
   * Promise library to use throughout the adapter
   */
  promise = Promise;
  
  get state () {
    return this._state[this.className.toLowerCase()] || new defaultEntityState();
  };
  
  private get _state () { 
    return this.store.getState().entities || Immutable.Map();
  }
  
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
  constructor(public store, public adapter: IResourceAdapter) {}
  
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
  public isLoading (id?: string | number) {
    // Check by ID
    if (id) {
      return false;
    // Check loading for all instances of this type (e.g. all Cases)
    } else {
      let s = this.state;
      return !!(s.adding || s.deleting || s.loadingMany || s.loadingOne || s.patching);
    }
  }
  
  /**
   * Lifecycle Hooks:
   * 
   * * `beforeCreate(payload[, cb])`
   * * `afterCreate(payload[, cb])`
   */
  add(payload: Object, persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig = {}): PromiseLike<any[]> {
    return this.promise.all( this.beforeAdd(payload, persistorConfig, adapterConfig) )
    .then( ([persistorConfig, adapterConfig]) => {
      debugger;
      this.store.dispatch( add(this, persistorConfig, adapterConfig) )
    })
    .then( (data) => this.afterAdd(data) );
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  // beforeAdd(payload: Object, persistorConfig, adapterConfig): Array<Object> {
  beforeAdd(payload: Object, persistorConfig: IPersistorConfig, adapterConfig?: IAdapterConfig): Array<any> {
    persistorConfig.data = payload;
    return [persistorConfig, adapterConfig];
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterAdd(data: any): PromiseLike<any[]> {
    return this.promise.all([data]);
  }
  
  /**
   * Lifecycle Hooks:
   * 
   * * `beforeUpdate(payload[, cb])`
   * * `afterUpdate(payload[, cb])`
   */
  update(id:number, patch: Object, persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig = {}): PromiseLike<any[]> {
    return this.promise.all(this.beforeUpdate(id, patch, persistorConfig, adapterConfig))
    .then(([persistorConfig, adapterConfig]) => this.store.dispatch(update(this, persistorConfig, adapterConfig)))
    .then(
      (data) => this.afterUpdate(data)
    );
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeUpdate(id: number, patch: Object, persistorConfig: IPersistorConfig, adapterConfig?: IAdapterConfig ): Array<any> {
    persistorConfig.data = patch;
    return [persistorConfig, adapterConfig];
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterUpdate(data: any): PromiseLike<any[]> {
    return this.promise.all([data]);
  }
  
  /**
   * Removes an item from the store.
   * 
   * * `beforeDestroy(payload[, cb])`
   * * `afterDestroy(payload[, cb])`
   */
  destroy(id: string | number, persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig = {}): PromiseLike<any[]> {
    return this.promise.all(this.beforeDestroy(id, persistorConfig, adapterConfig))
    .then(([persistorConfig, adapterConfig]) => this.store.dispatch(destroy(this, persistorConfig, adapterConfig)))
    .then(([res]) => this.afterDestroy(res.data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeDestroy(id: string | number, persistorConfig: IPersistorConfig, adapterConfig?: IAdapterConfig): Array<any> {
    return [persistorConfig, adapterConfig];
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterDestroy(data: any): PromiseLike<any[]> {
    return this.promise.all([data]);
  }
 
  /**
   * Finds a single and puts it into the server store.
   * 
   * * `beforeFindOne(payload[, cb])`
   * * `afterFindOne(payload[, cb])`
   */
  findOne(id: number, persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig = {}): PromiseLike<any[]> {
    return this.promise.all( this.beforeFindOne(id, persistorConfig, adapterConfig) )
    .then( ([persistorConfig, adapterConfig]) => {
      return this.store.dispatch( findOne(this, persistorConfig, adapterConfig) )
    })
    .then( (data) => this.afterFindOne(data, adapterConfig) );
  }
  
  /**
   * Default identity hook (return what was passed in) 
   */
  beforeFindOne(id: number, persistorConfig: IPersistorConfig, adapterConfig?: IAdapterConfig): Array<any> {
    return [persistorConfig, adapterConfig];
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterFindOne(data: any, adapterConfig?: Object): (PromiseLike<any[]>) {
    return this.promise.all([data]);
  }

  /**
   * Finds items and puts them into the store.
   * 
   * * `beforeFind(payload[, cb])`
   * * `afterFind(payload[, cb])`
   */
  // TODO: Determine if type OR is needed
  find(persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig = {}): PromiseLike<any[]>  {
    return this.promise.all(this.beforeFind(persistorConfig, adapterConfig))
    .then( ([persistorConfig, adapterConfig]) => this.store.dispatch(find(this, persistorConfig, adapterConfig)) )
    .then((data) => this.afterFind(data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeFind(persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig): Array<any> {
    return [persistorConfig, adapterConfig];
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterFind(data: any): any {
    return this.promise.all([data]);
  }

}
