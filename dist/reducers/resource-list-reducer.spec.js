"use strict";
var resource_list_reducer_1 = require('./resource-list-reducer');
var Immutable = require('immutable');
// import 'angular-mocks';
var C = require('../resources/constants');
var type = 'CASE';
var reducer;
var verifyDefault = function (reduc, exclude) {
    // let defaults = ['loadingMany', 'loadingOne', 'deleting', 'patching', 'adding'];
    var defaults = ['loadingMany', 'page', 'count'];
    if (exclude) {
        defaults.splice(defaults.indexOf(exclude), 1);
    }
    defaults.forEach(function (item) {
        expect(reduc[item]).toBeFalsy();
    });
};
describe('defaultListReducer', function () {
    beforeEach(function () {
        reducer = resource_list_reducer_1.defaultListReducer(type);
    });
    it('returns a default state', function () {
        var reduc = reducer(undefined, {});
        verifyDefault(reduc);
        expect(Immutable.is(reduc.result, Immutable.Map())).toBeTruthy();
    });
    it('should handle FINDING_CASE', function () {
        var reduc = reducer(undefined, {
            type: C.FINDING + "_" + type
        });
        verifyDefault(reduc, 'loading');
        expect(reduc.loading).toBeTruthy();
    });
    it('should handle FOUND_CASE', function () {
        var reduc = reducer(undefined, {
            type: C.FOUND + "_" + type
        });
        verifyDefault(reduc, 'loading');
        expect(reduc.loading).toBeFalsy();
    });
    it('should handle SET_LIST_PAGE', function () {
        var reduc = reducer(undefined, {
            type: C.SET_LIST + "_PAGE_" + type,
            payload: 22
        });
        verifyDefault(reduc, 'page');
        expect(reduc.page).toEqual(22);
    });
    it('should handle SET_LIST_COUNT', function () {
        var reduc = reducer(undefined, {
            type: C.SET_LIST + "_COUNT_" + type,
            payload: 3
        });
        verifyDefault(reduc, 'count');
        expect(reduc.count).toEqual(3);
    });
});
