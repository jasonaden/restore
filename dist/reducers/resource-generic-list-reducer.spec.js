"use strict";
var resource_generic_list_reducer_1 = require('./resource-generic-list-reducer');
var Immutable = require('immutable');
// import 'angular-mocks';
var C = require('../resources/constants');
var type = 'CASE';
var reducer;
var uri = '/cases/1/notes';
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
describe('defaultGenericListReducer', function () {
    describe('initialization tests', function () {
        beforeEach(function () {
            reducer = resource_generic_list_reducer_1.defaultGenericListReducer();
        });
        it('returns a default state', function () {
            var reduc = reducer(undefined, {});
            // verifyDefault(reduc);
            expect(Immutable.is(reduc, Immutable.Map())).toBeTruthy();
        });
        it('should handle FINDING_LIST', function () {
            var reduc = reducer(undefined, {
                type: "" + C.FINDING_LIST,
                meta: { uri: uri }
            });
            expect(reduc.get(uri).get('loading')).toBeTruthy();
            reduc = reducer(reduc, {
                type: "" + C.FOUND_LIST,
                meta: { uri: uri }
            });
            expect(reduc.get(uri).loading).toBeFalsy();
        });
    });
    describe('instantiated tests', function () {
        var reduc;
        beforeEach(function () {
            reduc = reducer(undefined, {
                type: "" + C.FINDING_LIST,
                meta: { uri: uri }
            });
        });
        it('should handle SET_LIST_RESULT', function () {
            reduc = reducer(reduc, {
                type: "" + C.SET_LIST_RESULT,
                meta: { uri: uri },
                payload: [1, 2, 3]
            });
            expect(reduc.get(uri).get('result').get(1).toJS()).toEqual([1, 2, 3]);
        });
        it('should handle SET_LIST_PAGE', function () {
            reduc = reducer(reduc, {
                type: "" + C.SET_LIST_PAGE,
                meta: { uri: uri },
                payload: 2
            });
            expect(reduc.get(uri).page).toEqual(2);
        });
        it('should handle SET_LIST_COUNT', function () {
            reduc = reducer(reduc, {
                type: "" + C.SET_LIST_COUNT,
                meta: { uri: uri },
                payload: 150
            });
            expect(reduc.get(uri).count).toEqual(150);
        });
    });
});
