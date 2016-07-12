"use strict";
var transform_1 = require('./transform');
describe('transform', function () {
    it('transforms a nested object', function () {
        var data = {
            foo: {
                bar: 'fizz'
            }
        };
        var callback = function (key, value) {
            if (key === 'bar' && value === 'fizz') {
                return 'buzz';
            }
            return value;
        };
        var transformed = transform_1.transform(data, callback);
        expect(transformed.foo.bar).toBe('buzz');
    });
});
