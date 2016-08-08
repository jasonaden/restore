"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
function findOne(payload, config) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.FINDING_ONE, config.className));
        return config.adapter.findOne(payload, config)
            .then(function (res) {
            dispatch(action_1.action(constants_1.FOUND_ONE, config.className));
            return [res.data];
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, config.className, error));
            return config.promise.reject(error);
        });
    };
}
exports.findOne = findOne;
