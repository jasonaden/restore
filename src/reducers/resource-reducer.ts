import {Reducer} from 'redux';
import {IEntityState} from '../resources/interfaces';
import * as Immutable from 'immutable';

import * as C from '../resources/constants';

export const defaultEntityState = Immutable.Record({
  loadingMany: false,
  loadingOne: false,
  deleting: false,
  patching: false,
  adding: false,
  items: Immutable.Map()
});

// TODO: Look at splitting out the Resource.items and ResourceList.result/sequence, etc.
/**
 * Generic reducer for items of any type (entities). Produces a state tree like:
 * 
 * ```
 *  entities = {
 *    customer: {},
 *    ...
 *    case: {
 *      // sequence of cases as returned from most recent API call
 *      result: {page: 2, sequence: [6, 3, 5, ...]},
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
   *  t(C."LOADING_SOMETHING", "CASE"); // returns LOADING_SOMETHING_CASE
   * ``` 
   */
  function t (str: string, type: string): string {
    return str + '_' + type;
  }
  
  return (state = new defaultEntityState(), action: any) => {

    switch (action.type) {

      case t(C.FINDING_ONE, type):
        return state.set('loadingOne', true);
      case t(C.FOUND_ONE, type):
        return state.set('loadingOne', false);

      case t(C.DESTROYING, type):
        return state.set('deleting', true);
      case t(C.DESTROYED, type):
        return state.set('deleting', false);

      case t(C.PATCHING, type):
        return state.set('patching', true);
      case t(C.PATCHED, type):
        return state.set('patching', false);

      case t(C.ADDING, type):
        return state.set('adding', true);
      case t(C.ADDED, type):
        return state.set('adding', false);
      
      case t(C.SET_ONE, type):
        return state.setIn(['items', action.payload._links.self.href], Immutable.fromJS(action.payload));
  
      case t(C.REMOVE_ONE, type):
        return state.set('items', state['items'].delete(action.payload));
  
      case t(C.ERROR, type):
        state = state.set('loadingMany', false);
        state = state.set('loadingOne', false);
        state = state.set('deleting', false);
        state = state.set('patching', false);
        state = state.set('adding', false);
        return state;

      default:
        return state;
    }
  } 
}