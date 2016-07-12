import {Reducer} from 'redux';
import {IEntityState} from './interfaces';
import * as Immutable from 'immutable';

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

export const defaultEntityState = Immutable.Record({
  result: Immutable.List(),
  loadingMany: false,
  loadingOne: false,
  deleting: false,
  patching: false,
  adding: false,
  meta: null,
  items: Immutable.Map()
});


/**
 * Generic reducer for items of any type (entities). Produces a state tree like:
 * 
 * ```
 *  entities = {
 *    case: {
 *      // sequence of cases as returned from most recent API call
 *      result: [6, 3, 5, ...],
 *      loadingMany: true,
 *      loadingOne: true,
 *      deleting: false,
 *      patching: false,
 *      adding: false,
 *      items: {
 *        3: {...},
 *        5: {...},
 *        6: {...},
 *        ...
 *      },
 *      meta: {
 *        count: 100,
 *        page: 2,
 *        links: {
 *          ...
 *        }
 *      }
 *    }
 *  }
 * ```
 */
export function defaultReducer<T> (type: string): Reducer {
  /**
   * Simple function for concatinating the type const with the type value.
   * 
   * ```
   *  t("LOADING_SOMETHING", "CASE"); // returns LOADING_SOMETHING_CASE
   * ``` 
   */
  function t (str: string, type: string): string {
    return str + '_' + type;
  }
  
  return (state = new defaultEntityState(), action: any) => {

    switch (action.type) {
      // SETUP ACTIONABLE ITEMS
      case `${FINDING}_${type}`:              // LOADING_MANY
        return state.set('loadingMany', true);
      case `${FINDING_ONE}_${type}`:          // LOADING_ONE
        return state.set('loadingOne', true);
      case `${DESTROYING}_${type}`:             // DELETING
        return state.set('deleting', true);
      case `${PATCHING}_${type}`:             // PATCHING
        return state.set('patching', true);
      case `${ADDING}_${type}`:               // ADDING
        return state.set('adding', true);
      
      // LOAD_MANY_CASE
      case t(FOUND, type):
        // Turn off loading indicator
        state = state.set('loadingMany', false);

        // Apply the sequenced result array
        state = state.mergeIn(['result'], action.payload.result.slice(0));
        
        // Iterate results and add each item
        state.result.map((key) => {
          state = state.setIn(['items', key], Immutable.fromJS(action.payload.items[key]));
        });
        
        // Apply metadata
        state = state.set('meta', action.payload.meta);
        
        return state;

      // LOAD_ONE_CASE
      case t(FOUND_ONE, type):
        // turn off loading indicator
        state = state.set('loadingOne', false);
        
        // set individual item
        return state.setIn(['items', '/cases/' + action.payload.id], Immutable.fromJS(action.payload));
      
      case t(ADD, type): // ADD_SOMETHING
        return state.setIn(['items', action.payload._links.self.href], Immutable.fromJS(action.payload));
      // TODO: ERROR CASE
      default:
        return state;
    }
  } 
}