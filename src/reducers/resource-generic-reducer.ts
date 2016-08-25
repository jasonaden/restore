import {Reducer} from 'redux';
import {IEntityState} from '../resources/interfaces';
import * as Immutable from 'immutable';

import * as C from '../resources/constants';

export const defaultGenericEntityState = Immutable.Record({
  loadingOne: false,
  deleting: false,
  patching: false,
  adding: false
});


/**
 * Generic reducer for items of any type (entities). Produces a state tree like:
 * 
 * ```
 *  entities = {
 *    customer: {},
 *    ...
 *    case: {
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
  let className: string;


  // figure out the resoure class and set up record for it
  function mkDefault (state, uri) {
    if( uri.indexOf(baseUri) === -1 ) {
      throw new Error(`resource-generic-reducer: received uri ${uri} doesn't contain ${baseUri}`);
    }
    let className = uri.split('/')[3]
    if( ! state.get(className) ) {
      return [state.setIn([className], new defaultGenericEntityState()), className];
    } else {
      return [state, className];
    }
  } 

  return (state: any = Immutable.Map(), action: any) => {
  
    switch (action.type) {

      /**  actions to update status associated with a resource type */
      case C.FINDING_ONE:
        [state, className] = mkDefault(state, action.meta.uri);
        return state.setIn([className,'loadingOne'], true);
      case C.FOUND_ONE:
        return state.setIn([className,'loadingOne'], false);

      case C.DESTROYING:
        [state, className] = mkDefault(state, action.meta.uri);
        return state.setIn([className,'deleting'], true);
      case C.DESTROYED:
        return state.setIn([className,'deleting'], false);

      case C.PATCHING:
        [state, className] = mkDefault(state, action.meta.uri);
        return state.setIn([className,'patching'], true);      
      case C.PATCHED:
        return state.setIn([className,'patching'], false);

      case C.ADDING:
        [state, className] = mkDefault(state, action.meta.uri);
        return state.setIn([className,'adding'], true);
      case C.ADDED:
        return state.setIn([className,'adding'], false);

      /** actions to set/unset resource data */
      case C.SET_ONE:
        return state.set(action.meta.uri, Immutable.fromJS(action.payload));
  
      case C.REMOVE_ONE:
        return state.delete(action.meta.uri);

      // For now, this depends on an error including the associated uri
      //  Might need to make it more generic to loop through all resource
      //  entityStates to reset all of them
      case C.ERROR:
        [state, className] = mkDefault(state, action.meta.uri);

        state = state.setIn([className,'loadingOne'], false);
        state = state.setIn([className,'deleting'], false);
        state = state.setIn([className,'patching'], false);
        return state.setIn([className,'adding'], false);

      default:
        return state;
    }
  } 
}