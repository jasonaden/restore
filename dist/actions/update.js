"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
function update(Resource, persistorConfig, adapterConfig) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.PATCHING, Resource.className));
        return Resource.adapter.update(persistorConfig, adapterConfig)
            .then(function (res) {
            dispatch(action_1.action(constants_1.PATCHED, Resource.className));
            return res.data;
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, Resource.className, error));
            return Promise.reject(error);
        });
    };
}
exports.update = update;
