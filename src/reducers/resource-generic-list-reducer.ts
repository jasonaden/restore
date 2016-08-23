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

export function defaultGenericListReducer<T> (type: string): Reducer {

  function mkDefault (state, uri) {
    if( ! state.get(uri) ) {
      return state.setIn([uri], new defaultListState());
    } else {
      return state;
    }
  } 

  // top level is a Map  
  return (state: any = Immutable.Map(), action: any) => {

    switch (action.type) {
 
      case C.FINDING_LIST:
        state = mkDefault(state, action.uri);
        return state.setIn([action.uri, 'loading'], true);
      case C.FOUND_LIST:
        state = mkDefault(state, action.uri);
        return state.setIn([action.uri, 'loading'], false);

      // TODO: Still not done
      case C.SET_LIST_RESULT:
        return state.setIn([action.uri, 'result', state.page], Immutable.List(action.payload));
      case C.SET_LIST_PAGE:
        return state.setIn([action.uri, 'page'], action.payload);
      case C.SET_LIST_COUNT:
        return state.setIn([action.uri,'count'], action.payload);


      default:
        return state;
    }
  } 
}