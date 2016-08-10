import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import { normalize, Schema, arrayOf } from 'normalizr';
import * as Immutable from 'immutable';
import {identity} from 'lodash';

import {IResourceAdapter, IResourceRequestConfig, IEntityState} from './interfaces';
import {defaultListState} from '../reducers/resource-list-reducer';
import {find} from '../actions/find';

/**
 * 
 */
export class ResourceList<T> {
  
  public className: string;
  public url: string;

  /**
   * Promise library to use throughout the adapter
   */
  // TODO: Move to constructor? So it can be there when creating the resource instance.
  promise = Promise;
  
  get state () {
    return this._state[this.listName.toLowerCase()] || new defaultListState();
  };
  
  private get _state () {
    return this.store.getState() || Immutable.Map();
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
  constructor(public listName: string, public store, public adapter: IResourceAdapter) {}
    
  /**
   * Check whether this resource list is loading.
   * 
   * Example:
   * 
   * ```
   * CaseList.isLoading(); // Checks whether loadMany is being run
   * 
   * ```
   */
  public isLoading () {
    return this._state.loading;
  }
   /**
   declare type ActionConfig = {
    adapter: IResourceAdapter,
    adapterConfig?: any,
    schema: any,
    className: string,
    promise: PromiseConstructor
   }*/

  /**
   * Finds items and puts them into the store.
   * 
   * * `beforeFind(payload[, cb])`
   * * `afterFind(payload[, cb])`
   */
  // TODO: Determine if type OR is needed
  find(config): PromiseLike<any[]> | Promise<any[]> {
    return this.promise.all([this.beforeFind(config)])
    .then(([config]) => {
      debugger;
      this.store.dispatch(find(this, config[0]))
    })
    .then(([data]) => this.afterFind(data));
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

}
