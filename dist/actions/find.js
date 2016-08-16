"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
function find(Resource, persistorConfig, adapterConfig) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.FINDING, adapterConfig.listName));
        return Resource.adapter.find(persistorConfig, adapterConfig)
            .then(function (res) {
            dispatch(action_1.action(constants_1.FOUND, adapterConfig.listName));
            return res.data;
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, adapterConfig.listName, error));
            return Promise.reject(error);
        });
    };
}
exports.find = find;
