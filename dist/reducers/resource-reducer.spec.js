"use strict";
var resource_reducer_1 = require('./resource-reducer');
// import 'angular-mocks';
var constants_1 = require('../resources/constants');
var type = 'CASE';
var reducer;
xdescribe('defaultReducer', function () {
    beforeEach(function () {
        reducer = resource_reducer_1.defaultReducer(type);
    });
    it('returns a default state', function () {
        expect(reducer(undefined, {})).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: false,
            deleting: false,
            patching: false,
            adding: false,
            items: {}
        });
    });
    it('should handle FINDING_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.FINDING + "_" + type
        })).toEqual({
            result: [],
            loadingMany: true,
            loadingOne: false,
            deleting: false,
            patching: false,
            adding: false,
            items: {}
        });
    });
    it('should handle FINDING_ONE_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.FINDING_ONE + "_" + type,
        })).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: true,
            deleting: false,
            patching: false,
            adding: false,
            items: {}
        });
    });
    it('should handle DESTROYING_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.DESTROYING + "_" + type
        })).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: false,
            deleting: true,
            patching: false,
            adding: false,
            items: {}
        });
    });
    it('should handle PATCHING_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.PATCHING + "_" + type
        })).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: false,
            deleting: false,
            patching: true,
            adding: false,
            items: {}
        });
    });
    it('should handle ADDING_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.ADDING + "_" + type
        })).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: false,
            deleting: false,
            patching: false,
            adding: true,
            items: {}
        });
    });
    it('should handle FOUND_CASE', function () {
        expect(reducer(undefined, {
            type: constants_1.FOUND + "_" + type,
            payload: {
                result: ['/cases/1'],
                items: {
                    '/cases/1': {
                        _links: { self: { href: '/cases/1' } }, _embedded: { entries: [{}] }
                    }
                }
            }
        })).toEqual({
            result: [],
            loadingMany: false,
            loadingOne: false,
            deleting: false,
            patching: false,
            adding: true,
            items: {}
        });
    });
});
