"use strict";
var action_1 = require('./action');
var constants_1 = require('../resources/constants');
var splitSchema_1 = require('../utils/splitSchema');
// TODO: Implement this function. Need to configure what to do after adding.
function add(config, payload, args) {
    return function (dispatch, store) {
        dispatch(action_1.action(constants_1.ADDING, config.className));
        return config.adapter.execute({
            url: config.url,
            method: 'POST'
        })
            .then(function (res) {
            alert("Need to implement what to do after ADD (ADD TO STORE)");
            dispatch(splitSchema_1.splitSchema(config.schema, config.className, res.data));
            return res.data;
        }, function (error) {
            alert('Error adding!');
            dispatch(action_1.action(constants_1.ERROR, config.className, error));
            return config.$q.reject(error);
        });
    };
}
exports.add = add;
