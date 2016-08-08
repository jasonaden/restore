// TODO: This should really only be for splitting the schema itself. It shouldn't include dispatching 
// of actions. Need to work out a way to pass normalized data back to Resource. Probably should be 
// coming straight from the adapter this way, then leave dispatching only to the Resource.
"use strict";
// TODO: Needs to recurse through embedded objects
// Customer link: /v2/customers/2/cases
// Case link:     /v2/customers/2
/**
 *  {
 *
 *    items: [array of items returned],
 *    related: {
 *      customer: {},
 *      company: {}
 *    }
 *  }
 *
 */
var normalizr_1 = require('normalizr');
var action_1 = require('../actions/action');
var constants_1 = require('../resources/constants');
var toCamelCase_1 = require('./toCamelCase');
var toLoudSnakeCase_1 = require('./toLoudSnakeCase');
function splitSchema(schema, name, data) {
    // Lowercase the schema name
    name = name.toLowerCase();
    // TODO: Get "thunk" in as a type so we can define the return type on these functions
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
        // TODO: Test that this FIND action is actually adding to the state
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
        for (var idKey in normalized.entities) {
            // Exclude main entity
            if (toLoudSnakeCase_1.toLoudSnakeCase(idKey) !== toLoudSnakeCase_1.toLoudSnakeCase(name)) {
                // Iterate over each object passed back and dispatch ADD action
                for (var y in normalized.entities[idKey]) {
                    dispatch(action_1.action(constants_1.ADD, toLoudSnakeCase_1.toLoudSnakeCase(idKey), normalized.entities[idKey][y]));
                }
            }
        }
    };
}
exports.splitSchema = splitSchema;
