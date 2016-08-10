"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
function find(ResourceList, config) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.FINDING, ResourceList.listName));
        debugger;
        return ResourceList.adapter.find(config)
            .then(function (res) {
            dispatch(action_1.action(constants_1.FOUND, config.className));
            return [res.data];
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, config.className, error));
            return config.promise.reject(error);
        });
    };
}
exports.find = find;
