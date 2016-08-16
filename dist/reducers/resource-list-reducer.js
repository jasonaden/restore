"use strict";
var Immutable = require('immutable');
var C = require('../resources/constants');
var defaultListState = Immutable.Record({
    result: Immutable.Map(),
    loading: false,
    page: null,
    count: null
});
function defaultListReducer(type) {
    /**
     * Simple function for concatinating the type const with the type value.
     *
     * ```
     *  t("LOADING_SOMETHING", "CASE"); // returns LOADING_SOMETHING_CASE
     * ```
     */
    function t(str, type) {
        return str + '_' + type.toUpperCase();
    }
    return function (state, action) {
        if (state === void 0) { state = new defaultListState(); }
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
    };
}
exports.defaultListReducer = defaultListReducer;
