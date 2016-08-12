import {Reducer} from 'redux';
import {IEntityState} from '../resources/interfaces';
import * as Immutable from 'immutable';

import * as C from '../resources/constants';

const defaultListState = Immutable.Record({
  result: Immutable.Map(),
  loading: false,
  page: null,
  count: null
});

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
        return state.setIn(['result', state.page], Immutable.List(action.payload));
      case t('SET_LIST_PAGE', type):
        return state.set('page', action.payload);
      case t('SET_LIST_COUNT', type):
        return state.set('count', action.payload);


      default:
        return state;
    }
  } 
}