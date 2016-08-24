"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
function find(Resource, persistorConfig, adapterConfig) {
    return function (dispatch, store) {
        dispatch({ type: constants_1.FINDING_LIST, meta: { uri: adapterConfig.uri } });
        return Resource.adapter.find(persistorConfig, adapterConfig)
            .then(function (res) {
            dispatch({ type: constants_1.FOUND_LIST, meta: { uri: adapterConfig.uri } });
            return res.data;
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, adapterConfig.listName, error));
            return Promise.reject(error);
        });
    };
}
exports.find = find;
