"use strict";
var normalizr_1 = require('normalizr');
var action_1 = require('../actions/action');
var constants_1 = require('../resources/constants');
var toCamelCase_1 = require('./toCamelCase');
var toLoudSnakeCase_1 = require('./toLoudSnakeCase');
function splitSchema(schema, name, data) {
    // Lowercase the schema name
    name = name.toLowerCase();
    return function (dispatch, store) {
        var normalized = normalizr_1.normalize(data.entries, normalizr_1.arrayOf(schema));
        // This is for testing only. If no results are returned, Normalizr will 
        // return result: [ undefined ] and entities[entity] = {undefined:{}}.
        if (normalized.result[0] === undefined) {
            normalized.result.length = 0;
            normalized.entities[toCamelCase_1.toCamelCase(name)] = {};
        }
        // Dispatch event for the main data that was gathered on this request.
        // This includes metadata about the collection.
        dispatch(action_1.action(constants_1.FIND, name.toUpperCase(), {
            result: normalized.result,
            items: normalized.entities[toCamelCase_1.toCamelCase(name)],
            meta: {
                count: data.total_entries,
                page: data.page,
                links: data._links
            }
        }));
        // Iterate over other objects that were returned (normalized) and 
        // dispatch add actions for them to get them into the store.
        for (var x in normalized.entities) {
            // Exclude main entity
            if (toLoudSnakeCase_1.toLoudSnakeCase(x) !== toLoudSnakeCase_1.toLoudSnakeCase(name)) {
                // Iterate over each object passed back and dispatch ADD action
                for (var y in normalized.entities[x]) {
                    dispatch(action_1.action(constants_1.ADD, toLoudSnakeCase_1.toLoudSnakeCase(x), normalized.entities[x][y]));
                }
            }
        }
    };
}
exports.splitSchema = splitSchema;
