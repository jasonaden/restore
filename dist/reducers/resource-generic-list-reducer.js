"use strict";
var Immutable = require('immutable');
var C = require('../resources/constants');
var defaultListState = Immutable.Record({
    result: Immutable.Map(),
    loading: false,
    page: 1,
    count: null
});
function defaultGenericListReducer(type) {
    function mkDefault(state, uri) {
        if (!state.get(uri)) {
            return state.setIn([uri], new defaultListState());
        }
        else {
            return state;
        }
    }
    // top level is a Map  
    return function (state, action) {
        if (state === void 0) { state = Immutable.Map(); }
        switch (action.type) {
            case C.FINDING_LIST:
                state = mkDefault(state, action.meta.uri);
                return state.setIn([action.meta.uri, 'loading'], true);
            case C.FOUND_LIST:
                return state.setIn([action.meta.uri, 'loading'], false);
            case C.SET_LIST_RESULT:
                return state.setIn([action.meta.uri, 'result', state.get(action.meta.uri).page], Immutable.List(action.payload));
            case C.SET_LIST_PAGE:
                return state.setIn([action.meta.uri, 'page'], action.payload);
            case C.SET_LIST_COUNT:
                return state.setIn([action.meta.uri, 'count'], action.payload);
            default:
                return state;
        }
    };
}
exports.defaultGenericListReducer = defaultGenericListReducer;
