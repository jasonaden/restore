import {Reducer} from 'redux';
import {IEntityState} from '../resources/interfaces';
import * as Immutable from 'immutable';

import * as C from '../resources/constants';

export const defaultGenericEntityState = Immutable.Record({
  loadingMany: false,
  loadingOne: false,
  deleting: false,
  patching: false,
  adding: false,
  items: Immutable.Map()
});


/**
 * Generic reducer for items of any type (entities). Produces a state tree like:
 * 
 * ```
 *  entities = {
 *    customer: {},
 *    ...
 *    cases: {
 *      // sequence of cases as returned from most recent API call
 *      loadingMany: true,
 *      loadingOne: true,
 *      deleting: false,
 *      patching: false,
 *      adding: false,
 *      },
 *      // TODO: Need to handle meta?
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

export function defaultGenericReducer<T> (type: string): Reducer {
  let baseUri: string = '/api/v2';

  // figure out the resoure class and set up record for it
  function mkDefault (state, className) {
    if( ! state.get(className) ) {
      return state.setIn([className], new defaultGenericEntityState());
    } else {
      return state;
    }
  } 

  return (state: any = Immutable.Map(), action: any) => {
    let className;
    let uri;

    switch (action.type) {

      /**  actions to update status associated with a resource type */
      case C.FINDING_ONE:
        state = mkDefault(state, action.meta.className);
        return state.setIn([action.meta.className,'loadingOne'], true);
      case C.FOUND_ONE:
        return state.setIn([action.meta.className,'loadingOne'], false);

      case C.DESTROYING:
        state = mkDefault(state, action.meta.className);
        return state.setIn([action.meta.className,'deleting'], true);
      case C.DESTROYED:
        return state.setIn([action.meta.className,'deleting'], false);

      case C.PATCHING:
        state = mkDefault(state, action.meta.className);
        return state.setIn([action.meta.className,'patching'], true);      
      case C.PATCHED:
        return state.setIn([action.meta.className,'patching'], false);

      case C.ADDING:
        state = mkDefault(state, action.meta.className);
        return state.setIn([action.meta.className,'adding'], true);
      case C.ADDED:
        return state.setIn([action.meta.className,'adding'], false);

      /** actions to set/unset resource data */
      case C.SET_ONE:
        className = action.payload._links.self.class;
        uri = action.payload._links.self.href;
        return state.setIn([className, 'items', uri], Immutable.fromJS(action.payload));
  
      case C.REMOVE_ONE:
        if( action.payload ) {
          className = action.payload._links.self.class;
          uri = action.payload._links.self.href;
          return state.deleteIn([className, 'items', uri])

        } else if ( action.meta && action.meta.className && action.meta.uri ) {
          return state.deleteIn([action.meta.className, 'items', action.meta.uri])
        }

      // For now, this depends on an error including the associated uri
      //  Might need to make it more generic to loop through all resource
      //  entityStates to reset all of them
      case C.ERROR:
        state = mkDefault(state, action.meta.className);

        className = action.meta.className;
        state = state.setIn([className,'loadingOne'], false);
        state = state.setIn([className,'deleting'], false);
        state = state.setIn([className,'patching'], false);
        return state.setIn([className,'adding'], false);

      default:
        return state;
    }
  } 
}