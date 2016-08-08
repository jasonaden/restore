"use strict";
function buildAction(type, suffix, payload) {
    return { type: type + "_" + suffix, payload: payload };
}
exports.buildAction = buildAction;
