import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import { normalize, Schema, arrayOf } from 'normalizr';
import * as Immutable from 'immutable';
import {identity} from 'lodash';

import {IResourceAdapter, IResourceRequestConfig, IEntityState} from './interfaces';

import {add} from '../actions/add';
import {find} from '../actions/find';
import {findOne} from '../actions/findOne';
import {destroy} from '../actions/destroy';
import {action} from '../actions/action';

import {
  FIND_ONE, FINDING_ONE, FOUND_ONE,
  FIND, FINDING, FOUND,
  ADD, ADDING, ADDED, 
  DESTROY, DESTROYING, DESTROYED,
  PATCH, PATCHING, PATCHED,
  UPDATE, UPDATING, UPDATED,
  REFRESH, REFRESHING, REFRESHED,
  ERROR
} from './constants';

import {defaultEntityState} from './resource-reducer';

/**
 * 
 */
export class Resource<T> {
  
  // TODO: Move URL down the stack. Needs to be part of the adapter config passed into the Resource constructor
  public url: string;
  // TODO: Move baseUrl down into the adapter or probably the persistence layer
  public baseUrl: string;
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
  constructor(public store, public adapter: IResourceAdapter, public schema: Schema) {}
    
  // TODO: ADD METHODS TO GET DATA OUT OF THE RESOURCE.
  
  
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
  add(payload: T, config?: any): PromiseLike<any[]> {
    return this.promise.all([this.beforeAdd(payload, config)])
    .then(([payload, config]) => this.store.dispatch(add(this, payload, config)))
    .then(([data]) => this.afterAdd(data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeAdd(payload: T, config?: any): PromiseLike<any[]> {
    return this.promise.all([payload, config]);
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
  // TODO: Create the update() action creator
  update(payload: T, config?: any): PromiseLike<any[]> {
    return this.promise.all([this.beforeUpdate(payload, config)])
    .then(([payload, config]) => this.store.dispatch(update(this, payload, config)))
    .then(([data]) => this.afterUpdate(data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeUpdate(payload: T, config?: any): PromiseLike<any[]> {
    return this.promise.all([payload, config]);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterUpdate(data: any): PromiseLike<any[]> {
    return this.promise.all([data]);
  }
  
  /**
   * Saves data. Will determine whether to create or update.
   * 
   * For Lifecycle hooks, see `add` or `update`.
   */
  // TODO: Implement save() method. This should determine whether to call update() or create()
  // therefore it needs more params passed in. Like the payload and the original object so 
  // comparison can be done.
  save(payload: T, config?: any): PromiseLike<any[]> {
    throw('Implement save method');
    // return this.promise.all([this.beforeUpdate(payload, config)])
    // .then(([payload, config]) => this.store.dispatch(update(this, payload, config)))
    // .then(([data]) => this.afterUpdate(data));
  }
  
  /**
   * Removes an item from the store.
   * 
   * * `beforeDestroy(payload[, cb])`
   * * `afterDestroy(payload[, cb])`
   */
  destroy(id: string | number, config?: any): PromiseLike<any[]> {
    return this.promise.all([this.beforeDestroy(id, config)])
    .then(args => this.store.dispatch(destroy(this, id, config)))
    .then(data => this.afterFind(data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeDestroy(id: string | number, config?: any): PromiseLike<any[]> {
    return this.promise.all([config]);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterDestroy(data: any): PromiseLike<any[]> {
    return this.promise.all([data]);
  }
  
  /**
   * Finds items and puts them into the store.
   * 
   * * `beforeFind(payload[, cb])`
   * * `afterFind(payload[, cb])`
   */
  find(config?: any): PromiseLike<any[]> | Promise<any[]> {
    return this.promise.all([this.beforeFind(config)])
    .then(([args]) => this.store.dispatch(find(this, args)))
    .then(data => this.afterFind(data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeFind(config?: any): PromiseLike<any[]> {
    return this.promise.all([config]);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterFind(data: any): PromiseLike<any[]> {
    return this.promise.all([data]);
  }
  
  /**
   * Finds a single and puts it into the store.
   * 
   * * `beforeFindOne(payload[, cb])`
   * * `afterFindOne(payload[, cb])`
   */
  // TODO: Fix findOne()
  findOne(id: number, config?: any): PromiseLike<any[]> {
    return this.promise.all([this.beforeFindOne(id, config)])
    .then(([id, config]) => this.store.dispatch(findOne(this, id, config)))
    .then(([data]) => this.afterFindOne(data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeFindOne(id: number, config?: IResourceRequestConfig): PromiseLike<any[]> {
    return this.promise.all([id, config]);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterFindOne(data: any): PromiseLike<any[]> {
    return this.promise.all([data]);
  }
  
  reloadMany(): void {
    this.store.dispatch(action(REFRESH, this.className, []))
    this.find();
  }
  

  
}