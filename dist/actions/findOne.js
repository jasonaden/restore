"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
function findOne(Resource, persistorConfig, adapterConfig) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.FINDING_ONE, Resource.className));
        return Resource.adapter.findOne(persistorConfig, adapterConfig)
            .then(function (res) {
            dispatch(action_1.action(constants_1.FOUND_ONE, Resource.className));
            return res.data;
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, Resource.className, error));
            return Promise.reject(error);
        });
    };
}
exports.findOne = findOne;
