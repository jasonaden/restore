import { Reducer } from 'redux';
import * as Immutable from 'immutable';
export declare const defaultGenericEntityState: Immutable.Record.Class;
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
export declare function defaultGenericReducer(): Reducer;
