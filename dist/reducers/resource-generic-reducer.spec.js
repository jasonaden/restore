"use strict";
var resource_generic_reducer_1 = require('./resource-generic-reducer');
var Immutable = require('immutable');
var case_1 = require('../mocks/case');
var C = require('../resources/constants');
var type = 'CASE';
var reducer;
var uri = '/api/v2/cases/1';
var className = 'case';
var verifyClassRecord = function (classRecord, targetProp) {
    var defaults = ['loadingOne', 'deleting', 'patching', 'adding'];
    // verify targetProp is true
    if (targetProp) {
        if (targetProp === 'all') {
            defaults.forEach(function (item) {
                expect(classRecord[item]).toBeDefined();
                expect(classRecord[item]).toBeTruthy();
            });
            return;
        }
        else {
            expect(classRecord[targetProp]).toBeDefined();
            expect(classRecord[targetProp]).toBeTruthy();
        }
    }
    if (targetProp) {
        defaults.splice(defaults.indexOf(targetProp), 1);
    }
    // verify all others are false
    defaults.forEach(function (item) {
        expect(classRecord[item]).toBeDefined();
        expect(classRecord[item]).toBeFalsy();
    });
};
describe('defaultGenericReducer', function () {
    beforeEach(function () {
        reducer = resource_generic_reducer_1.defaultGenericReducer();
    });
    describe('actions to update statuses', function () {
        it('returns a default state', function () {
            var reduc = reducer(undefined, {});
            expect(Immutable.is(reduc, Immutable.Map())).toBeTruthy();
        });
        it('should create new default entity state records for new types', function () {
            var reduc = reducer(undefined, {
                type: "" + C.FINDING_ONE,
                meta: { className: className }
            });
            expect(reduc.get(className)).toBeDefined();
            expect(reduc.get('customers')).not.toBeDefined();
            reduc = reducer(reduc, {
                type: "" + C.FINDING_ONE,
                meta: { className: 'customers' }
            });
            expect(reduc.get(className)).toBeDefined();
            expect(reduc.get('customers')).toBeDefined();
        });
        it('should handle FINDING_ONE and FOUND_ONE', function () {
            var reduc = reducer(undefined, {
                type: "" + C.FINDING_ONE,
                meta: { className: className }
            });
            verifyClassRecord(reduc.get(className), 'loadingOne');
            reduc = reducer(reduc, {
                type: "" + C.FOUND_ONE,
                meta: { className: className }
            });
            verifyClassRecord(reduc.get(className));
        });
        it('should handle DESTROYING and DESTROYED', function () {
            var reduc = reducer(undefined, {
                type: "" + C.DESTROYING,
                meta: { className: className }
            });
            verifyClassRecord(reduc.get(className), 'deleting');
            reduc = reducer(reduc, {
                type: "" + C.DESTROYED,
                meta: { className: className }
            });
            verifyClassRecord(reduc.get(className));
        });
        it('should handle PATCHING and PATCHED', function () {
            var reduc = reducer(undefined, {
                type: "" + C.PATCHING,
                meta: { className: className }
            });
            verifyClassRecord(reduc.get(className), 'patching');
            reduc = reducer(reduc, {
                type: "" + C.PATCHED,
                meta: { className: className }
            });
            verifyClassRecord(reduc.get(className));
        });
        it('should handle ADDING and ADDED', function () {
            var reduc = reducer(undefined, {
                type: "" + C.ADDING,
                meta: { className: className }
            });
            verifyClassRecord(reduc.get(className), 'adding');
            reduc = reducer(reduc, {
                type: "" + C.ADDED,
                meta: { className: className }
            });
            verifyClassRecord(reduc.get(className));
        });
    });
    describe('actions to set/unset values', function () {
        beforeEach(function () {
            uri = '/api/v2/cases/13';
        });
        it('should handle SET_ONE', function () {
            var reduc = reducer(undefined, {
                type: "" + C.SET_ONE,
                payload: case_1.caseData
            });
            var className = case_1.caseData._links.self.class;
            var uri = case_1.caseData._links.self.href;
            expect(reduc.get(className).get('items').get(uri)).toBeDefined();
            expect(reduc.get(className).get('items').get(uri).get('id')).toEqual(13);
        });
        it('should handle REMOVE_ONE when the payload is passed', function () {
            var reduc = reducer(undefined, {
                type: "" + C.SET_ONE,
                payload: case_1.caseData
            });
            var className = case_1.caseData._links.self.class;
            var uri = case_1.caseData._links.self.href;
            expect(reduc.get(className).get('items').get(uri)).toBeDefined();
            expect(reduc.get(className).get('items').get(uri).get('id')).toEqual(13);
            reduc = reducer(reduc, {
                type: "" + C.REMOVE_ONE,
                payload: case_1.caseData
            });
            expect(reduc.get(className).get('items').get(uri)).not.toBeDefined();
        });
        it('should handle REMOVE_ONE when the className and uri is passed', function () {
            var reduc = reducer(undefined, {
                type: "" + C.SET_ONE,
                payload: case_1.caseData
            });
            var className = case_1.caseData._links.self.class;
            var uri = case_1.caseData._links.self.href;
            expect(reduc.get(className).get('items').get(uri)).toBeDefined();
            expect(reduc.get(className).get('items').get(uri).get('id')).toEqual(13);
            reduc = reducer(reduc, {
                type: "" + C.REMOVE_ONE,
                meta: {
                    className: className,
                    uri: uri
                }
            });
            expect(reduc.get(className).get('items').get(uri)).not.toBeDefined();
        });
    });
    describe('actions to take on error', function () {
        it('should reset all state settngs to false', function () {
            // set all the states to true
            var reduc = reducer(undefined, {
                type: C.FINDING_ONE,
                meta: { className: className }
            });
            var list = [C.DESTROYING, C.PATCHING, C.ADDING];
            list.forEach(function (item) {
                reduc = reducer(reduc, {
                    type: item,
                    meta: { className: className }
                });
            });
            // all items should be true
            verifyClassRecord(reduc.get(className), 'all');
            reduc = reducer(reduc, {
                type: C.ERROR,
                meta: { className: className }
            });
            // all items should be false
            verifyClassRecord(reduc.get(className));
        });
    });
});
