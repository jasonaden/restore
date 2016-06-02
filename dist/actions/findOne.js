"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
var splitSchema_1 = require('../utils/splitSchema');
function findOne(config, args) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.FINDING_ONE, config.className));
        return config.adapter.execute({
            url: config.url,
            method: 'GET'
        })
            .then(function (res) {
            dispatch(splitSchema_1.splitSchema(config.schema, config.className, res.data));
            return res.data;
        }, function (error) {
            dispatch(action_1.action(constants_1.ERROR, config.className, error));
            return config.$q.reject(error);
        });
    };
}
exports.findOne = findOne;
