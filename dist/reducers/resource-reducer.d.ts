import { Reducer } from 'redux';
import * as Immutable from 'immutable';
export declare const defaultEntityState: Immutable.Record.Class;
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
export declare function defaultReducer<T>(type: string): Reducer;
