import {Reducer} from 'redux';
import {IEntityState} from '../resources/interfaces';
import * as Immutable from 'immutable';

import * as C from '../resources/constants';

export const defaultListState = Immutable.Record({
  result: Immutable.List(),
  loading: false,
  page: 1,
  count: null
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
export function defaultListReducer<T> (type: string): Reducer {
  /**
   * Simple function for concatinating the type const with the type value.
   * 
   * ```
   *  t("LOADING_SOMETHING", "CASE"); // returns LOADING_SOMETHING_CASE
   * ``` 
   */
  function t (str: string, type: string): string {
    return str + '_' + type.toUpperCase();
  }
  
  return (state = new defaultListState(), action: any) => {

    switch (action.type) {

      case t(C.FINDING, type):
        return state.set('loading', true);
      case t(C.FOUND, type):
        return state.set('loading', false);

      case t('SET_LIST_RESULT', type):
        return state.set('result', Immutable.List(action.payload));
      case t('SET_LIST_PAGE', type):
        return state.set('page', action.payload);
      case t('SET_LIST_COUNT', type):
        return state.set('count', action.payload);


      default:
        return state;
    }
  } 
}