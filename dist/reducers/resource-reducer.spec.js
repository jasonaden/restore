"use strict";
var resource_reducer_1 = require('./resource-reducer');
var Immutable = require('immutable');
// import 'angular-mocks';
var constants_1 = require('../resources/constants');
var type = 'CASE';
var reducer;
var verifyDefault = function (reduc, exclude) {
    var defaults = ['loadingMany', 'loadingOne', 'deleting', 'patching', 'adding'];
    if (exclude) {
        defaults.splice(defaults.indexOf(exclude), 1);
    }
    defaults.forEach(function (item) {
        expect(reduc[item]).toBeFalsy();
    });
};
describe('defaultReducer', function () {
    beforeEach(function () {
        reducer = resource_reducer_1.defaultReducer(type);
    });
    it('returns a default state', function () {
        var reduc = reducer(undefined, {});
        verifyDefault(reduc);
        expect(Immutable.is(reduc.items, Immutable.Map())).toBeTruthy();
    });
    it('should handle FINDING_CASE', function () {
        var reduc = reducer(undefined, {
            type: constants_1.FINDING + "_" + type
        });
        verifyDefault(reduc, 'loadingMany');
        expect(reduc.loadingMany).toBeTruthy();
    });
    it('should handle FINDING_ONE_CASE', function () {
        var reduc = reducer(undefined, {
            type: constants_1.FINDING_ONE + "_" + type
        });
        verifyDefault(reduc, 'loadingOne');
        expect(reduc.loadingOne).toBeTruthy();
    });
    it('should handle FOUND_CASE', function () {
        var reduc = reducer(undefined, {
            type: constants_1.FOUND + "_" + type
        });
        verifyDefault(reduc, 'loadingOne');
        expect(reduc.loadingOne).toBeFalsy();
    });
    it('should handle DESTROYING_CASE', function () {
        var reduc = reducer(undefined, {
            type: constants_1.DESTROYING + "_" + type
        });
        verifyDefault(reduc, 'deleting');
        expect(reduc.deleting).toBeTruthy();
    });
    it('should handle PATCHING_CASE', function () {
        var reduc = reducer(undefined, {
            type: constants_1.PATCHING + "_" + type
        });
        verifyDefault(reduc, 'patching');
        expect(reduc.patching).toBeTruthy();
    });
    it('should handle ADDING_CASE', function () {
        var reduc = reducer(undefined, {
            type: constants_1.ADDING + "_" + type
        });
        verifyDefault(reduc, 'adding');
        expect(reduc.adding).toBeTruthy();
    });
});
