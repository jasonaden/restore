
// TODO: This should really only be for splitting the schema itself. It shouldn't include dispatching 
// of actions. Need to work out a way to pass normalized data back to Resource. Probably should be 
// coming straight from the adapter this way, then leave dispatching only to the Resource.

// TODO: Needs to recurse through embedded objects

// Customer link: /v2/customers/2/cases
// Case link:     /v2/customers/2

/**
 *  {
 *    
 *    items: [array of items returned],
 *    related: {
 *      customer: {},
 *      company: {}
 *    }
 *  }
 * 
 */



import {normalize, arrayOf} from 'normalizr';
import {action} from '../actions/action';
import {FIND, ADD} from '../resources/constants';
import {toCamelCase} from './toCamelCase';
import {toLoudSnakeCase} from './toLoudSnakeCase';

export function splitSchema (schema, name: string, data) {
  // Lowercase the schema name
  name = name.toLowerCase();
  
  // TODO: Get "thunk" in as a type so we can define the return type on these functions
  return (dispatch, store) => {
    let normalized = normalize(data.entries, arrayOf(schema));
    // This is for testing only. If no results are returned, Normalizr will 
    // return result: [ undefined ] and entities[entity] = {undefined:{}}.
    if (normalized.result[0] === undefined) {
      normalized.result.length = 0;
      normalized.entities[toCamelCase(name)] = {};
    }
    // Dispatch event for the main data that was gathered on this request.
    // This includes metadata about the collection.
    // TODO: Test that this FIND action is actually adding to the state
    dispatch(action(FIND, name.toUpperCase(), {
      result: normalized.result,
      items: normalized.entities[toCamelCase(name)],
      meta: {
        count: data.total_entries,
        page: data.page,
        links: data._links
      }
    }));
    
    // Iterate over other objects that were returned (normalized) and 
    // dispatch add actions for them to get them into the store.
    for (let idKey in normalized.entities) {
      // Exclude main entity
      if (toLoudSnakeCase(idKey) !== toLoudSnakeCase(name)) {
        // Iterate over each object passed back and dispatch ADD action
        for (let y in normalized.entities[idKey]) {
          dispatch(action(ADD, toLoudSnakeCase(idKey), normalized.entities[idKey][y]));
        }
      }
    }
  }
}