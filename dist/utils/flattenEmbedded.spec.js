"use strict";
var utils_1 = require('../utils');
describe('flattenEmbedded', function () {
    it('flattens embedded data', function () {
        var value = 'some value';
        var data = {
            _embedded: {
                p: value
            }
        };
        var flattened = utils_1.flattenEmbedded(data);
        expect(flattened.p).toBe(value);
    });
});
