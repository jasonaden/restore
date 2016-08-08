"use strict";
var base_persistor_1 = require('./base-persistor');
describe('BasePersistor', function () {
    var persistor = new base_persistor_1.BasePersistor();
    var newObj;
    beforeEach(function () {
        newObj = { id: 789, $private: 'things' };
    });
    describe('has a toJSON method that', function () {
        var adapter;
        var newObj;
        beforeEach(function () {
            newObj = { id: 789, $private: 'things' };
        });
        it('returns a new object with own enumerable properties', function () {
            var extendedObj = Object.create(newObj, {
                nonEnumProp: {
                    enumerable: false,
                    value: 'non-enum'
                }
            });
            extendedObj.newProp = 'new';
            var seralizable = persistor.toJSON(extendedObj);
            // Make sure non-enumerable prop is accessible
            expect(extendedObj.nonEnumProp).toBe('non-enum');
            // Guarnatee immutable
            expect(seralizable).not.toBe(newObj);
            // Ensure only own enumerable properties are returned
            expect(seralizable.newProp).toBe('new');
            expect(seralizable.id).toBeUndefined();
        });
        it('cleans private properties', function () {
            var seralizable = persistor.toJSON(newObj);
            expect(seralizable.$private).toBeUndefined();
            expect(seralizable.id).toBe(789);
        });
    });
});
