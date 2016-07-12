"use strict";
var tokenize_1 = require('./tokenize');
function toSnakeCase(string) {
    if (string) {
        return tokenize_1.tokenize(string).replace(/[ ]/g, '_').toLowerCase();
    }
}
exports.toSnakeCase = toSnakeCase;
