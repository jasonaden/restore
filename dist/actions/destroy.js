"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
function destroy(Resource, persistorConfig, adapterConfig) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.DESTROYING, adapterConfig.listName));
        return Resource.adapter.destroy(persistorConfig, adapterConfig)
            .then(function (res) {
            dispatch(action_1.action(constants_1.DESTROYED, adapterConfig.listName));
            return [res.data];
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, adapterConfig.listName, error));
            return Promise.reject(error);
        });
    };
}
exports.destroy = destroy;
