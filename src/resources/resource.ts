import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import { normalize, Schema, arrayOf } from 'normalizr';
import * as Immutable from 'immutable';
import {INgRedux, ngRedux, Middleware} from 'ng-redux';
import {IResourceAdapter, IResourceRequestConfig, IEntityState} from './interfaces';

import {find} from '../actions/find';
import {findOne} from '../actions/findOne';
import {destroy} from '../actions/destroy';
import {action} from '../actions/action';

import {flattenEmbedded} from '../utils';

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
  
  public url: string;
  public baseUrl: string;
  public className: string;
  
  public store: Store;
  
  get state () {
    return this._state[this.className.toLowerCase()] || new defaultEntityState();
  };
  
  private get _state () {
    return this.store.getState().entities || Immutable.Map();
  }
  
  public $http: ng.IHttpService;
  public $q: ng.IQService;
  
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
  constructor($ngRedux, $http, $q, public adapter: IResourceAdapter, public schema: Schema) {
    this.store = $ngRedux;
    this.$http = $http;
    this.$q = $q;
  }
    
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
  add(payload: T, config?: IResourceRequestConfig): ng.IPromise<any> {
    return this.$q.when(this.beforeAdd(payload, config))
    .then(args => this.store.dispatch(add(this, payload, config)))
    .then(data => this.afterAdd(data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeAdd(payload: T, config?: IResourceRequestConfig): ng.IPromise<(T | IResourceRequestConfig)[]> {
    return this.$q.when(config).then(config => [payload, config]);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterAdd(data: any): ng.IPromise<any> {
    return this.$q.when(data);
  }
  
  /**
   * Lifecycle Hooks:
   * 
   * * `beforeUpdate(payload[, cb])`
   * * `afterUpdate(payload[, cb])`
   */
  update(payload: T): Action<T> {
    return action<T>(UPDATE, this.className, payload);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeUpdate(config?: IResourceRequestConfig): ng.IPromise<IResourceRequestConfig> {
    return this.$q.when(config);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterUpdate(data: any): ng.IPromise<any> {
    return this.$q.when(data);
  }
  
  /**
   * Saves data. Will determine whether to create or update.
   * 
   * For Lifecycle hooks, see `add` or `update`.
   */
  save(payload: T): Action<T> {
    return action<T>(ADD, this.className, payload);
  }
  
  /**
   * Removes an item from the store.
   * 
   * * `beforeDestroy(payload[, cb])`
   * * `afterDestroy(payload[, cb])`
   */
  destroy(payload: T, config?: IResourceRequestConfig): ng.IPromise<any> {
    let id = this.adapter.generateSlug(payload);
    
    return this.$q.when(this.beforeDestroy(id, config))
    .then(args => this.store.dispatch(destroy(this, id, config)))
    .then(data => this.afterFind(data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeDestroy(id: string, config?: IResourceRequestConfig): ng.IPromise<IResourceRequestConfig> {
    return this.$q.when(config);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterDestroy(data: any): ng.IPromise<any> {
    return this.$q.when(data);
  }
  
  /**
   * Finds items and puts them into the store.
   * 
   * * `beforeFind(payload[, cb])`
   * * `afterFind(payload[, cb])`
   */
  find(args?: IResourceRequestConfig): ng.IPromise<any> {
    return this.$q.when(this.beforeFind(args))
    .then(args => this.store.dispatch(find(this, args)))
    .then(data => this.afterFind(data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeFind(config?: IResourceRequestConfig): ng.IPromise<IResourceRequestConfig> {
    return this.$q.when(config);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterFind(data: any): ng.IPromise<any> {
    return this.$q.when(data);
  }
  
  /**
   * Finds a single and puts it into the store.
   * 
   * * `beforeFindOne(payload[, cb])`
   * * `afterFindOne(payload[, cb])`
   */
  findOne(id: number, config?: IResourceRequestConfig): ng.IPromise<any> {
    return this.$q.when(this.beforeFindOne(id, config))
    .then(args => this.store.dispatch(findOne(this, id)))
    .then(data => this.afterFindOne(data));
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  beforeFindOne(id: number, config?: IResourceRequestConfig): ng.IPromise<IResourceRequestConfig> {
    return this.$q.when(config);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterFindOne(data: any): ng.IPromise<any> {
    return this.$q.when(data);
  }
  
  reloadMany(): void {
    this.store.dispatch(action(REFRESH, this.className, []))
    this.find();
  }
  

  
}