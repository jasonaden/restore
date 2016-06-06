"use strict";
var getPath_1 = require('./getPath');
describe('getPath', function () {
    it('pulls data from the base of an object', function () {
        var obj = {
            id: 101
        };
        expect(getPath_1.getPath(obj));
    });
});
