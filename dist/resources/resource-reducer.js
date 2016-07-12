"use strict";
var Immutable = require('immutable');
var constants_1 = require('./constants');
exports.defaultEntityState = Immutable.Record({
    result: Immutable.List(),
    loadingMany: false,
    loadingOne: false,
    deleting: false,
    patching: false,
    adding: false,
    meta: null,
    items: Immutable.Map()
});
/**
 * Generic reducer for items of any type (entities). Produces a state tree like:
 *
 * ```
 *  entities = {
 *    cases: {
 *      // sequence of cases as returned from most recent API call
 *      result: [6, 3, 5, ...],
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
function defaultReducer(type) {
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
        if (state === void 0) { state = new exports.defaultEntityState(); }
        switch (action.type) {
            // SETUP ACTIONABLE ITEMS
            case constants_1.FINDING + "_" + type:
                return state.set('loadingMany', true);
            case constants_1.FINDING_ONE + "_" + type:
                return state.set('loadingOne', true);
            case constants_1.DESTROYING + "_" + type:
                return state.set('deleting', true);
            case constants_1.PATCHING + "_" + type:
                return state.set('patching', true);
            case constants_1.ADDING + "_" + type:
                return state.set('adding', true);
            // LOAD_MANY_CASE
            case t(constants_1.FOUND, type):
                // Turn off loading indicator
                state = state.set('loadingMany', false);
                // Apply the sequenced result array
                state = state.mergeIn(['result'], action.payload.result.slice(0));
                // Iterate results and add each item
                state.result.map(function (key) {
                    state = state.setIn(['items', key], Immutable.fromJS(action.payload.items[key]));
                });
                // Apply metadata
                state = state.set('meta', action.payload.meta);
                return state;
            // LOAD_ONE_CASE
            case t(constants_1.FOUND_ONE, type):
                // turn off loading indicator
                state = state.set('loadingOne', false);
                // set individual item
                return state.setIn(['items', '/cases/' + action.payload.id], Immutable.fromJS(action.payload));
            case t(constants_1.ADD, type):
                return state.setIn(['items', action.payload._links.self.href], Immutable.fromJS(action.payload));
            // TODO: ERROR CASE
            default:
                return state;
        }
    };
}
exports.defaultReducer = defaultReducer;
