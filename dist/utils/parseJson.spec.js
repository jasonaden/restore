"use strict";
var parseJson_1 = require('./parseJson');
describe('parseJson', function () {
    it('allows a custom reviver', function () {
        var reviver = function (key, value) {
            if (key === '') {
                return value;
            }
            return value * 2;
        };
        var data = '{ "p": 5 }';
        var parsed = parseJson_1.parseJson(undefined, reviver, data, undefined);
        expect(parsed.p).toBe(10);
    });
    it('parses JSON', function () {
        var data = '{ "foo": "bar" }';
        var parsed = parseJson_1.parseJson(undefined, undefined, data, undefined);
        expect(parsed).toEqual({
            foo: 'bar'
        });
    });
    it('creates date objects', function () {
        var comparisonDate = new Date('1963-11-22T00:00:00.000Z');
        var data = '{ "date": "1963-11-22T00:00:00.000Z" }';
        var parsed = parseJson_1.parseJson(undefined, undefined, data, undefined);
        expect(parsed.date.getTime()).toBe(comparisonDate.getTime());
    });
});
