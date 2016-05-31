
import {normalize, arrayOf} from 'normalizr';
import {action} from '../actions/action';
import {FIND, ADD} from '../resources/constants';
import {toCamelCase} from './toCamelCase';
import {toLoudSnakeCase} from './toLoudSnakeCase';

export function splitSchema (schema, name: string, data) {
  // Lowercase the schema name
  name = name.toLowerCase();
  
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
    for (let x in normalized.entities) {
      // Exclude main entity
      if (toLoudSnakeCase(x) !== toLoudSnakeCase(name)) {
        // Iterate over each object passed back and dispatch ADD action
        for (let y in normalized.entities[x]) {
          dispatch(action(ADD, toLoudSnakeCase(x), normalized.entities[x][y]));
        }
      }
    }
  }
}