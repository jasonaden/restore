"use strict";
function action(type, suffix, payload) {
    return { type: type + "_" + suffix, payload: payload };
}
exports.action = action;
