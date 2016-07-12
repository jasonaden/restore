"use strict";
var tokenize_1 = require('./tokenize');
function toLoudSnakeCase(string) {
    if (string) {
        return tokenize_1.tokenize(string).replace(/[ ]/g, '_').toUpperCase();
    }
}
exports.toLoudSnakeCase = toLoudSnakeCase;
