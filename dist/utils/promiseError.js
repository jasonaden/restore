"use strict";
function promiseError(mess) {
    return function (err) {
        console.log("error in", mess, err);
        Promise.reject(err);
    };
}
exports.promiseError = promiseError;
