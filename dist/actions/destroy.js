"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
function destroy(payload, config) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.DESTROYING, config.className));
        return config.adapter.destroy(payload, config)
            .then(function (res) {
            dispatch(action_1.action(constants_1.DESTROYED, config.className));
            return [res.data];
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, config.className, error));
            return config.promise.reject(error);
        });
    };
}
exports.destroy = destroy;
