"use strict";
var Immutable = require('immutable');
var C = require('../resources/constants');
exports.defaultListState = Immutable.Record({
    result: Immutable.List(),
    loading: false,
    meta: null
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
function defaultListReducer(type) {
    /**
     * Simple function for concatinating the type const with the type value.
     *
     * ```
     *  t("LOADING_SOMETHING", "CASE"); // returns LOADING_SOMETHING_CASE
     * ```
     */
    function t(str, type) {
        return str + '_' + type;
    }
    return function (state, action) {
        if (state === void 0) { state = new exports.defaultListState(); }
        switch (action.type) {
            case t(C.FINDING, type):
                return state.set('loading', true);
            case t(C.FOUND, type):
                return state.set('loading', false);
            case t(C.SET_LIST, type):
                return state.set('items', action.payload);
            default:
                return state;
        }
    };
}
exports.defaultListReducer = defaultListReducer;