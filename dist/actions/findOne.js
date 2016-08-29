"use strict";
var constants_1 = require('../resources/constants');
function findOne(Resource, persistorConfig, adapterConfig) {
    return function (dispatch, store) {
        dispatch({ type: constants_1.FINDING_ONE, meta: { className: Resource.className } });
        return Resource.adapter.findOne(persistorConfig, adapterConfig)
            .then(function (res) {
            dispatch({ type: constants_1.FOUND_ONE, meta: { className: Resource.className } });
            return res.data;
        }, function (error) {
            dispatch({ type: constants_1.ERROR, meta: { className: Resource.className }, error: error });
            return Promise.reject(error);
        });
    };
}
exports.findOne = findOne;
