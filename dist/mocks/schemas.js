"use strict";
var normalizr_1 = require('normalizr');
var schemas_helpers_1 = require('./schemas_helpers');
// Default options
var getOptions = function (overrides) {
    if (overrides === void 0) { overrides = {}; }
    var options = {
        idAttribute: schemas_helpers_1.generateSlug
    };
    return Object.assign(options, overrides);
};
/**
 * Schema setup for Case
 */
exports.caseSchema = new normalizr_1.Schema('case', getOptions());
/**
 * Schema setup for Interactions (reply, message, draft)
 */
exports.interactionSchema = new normalizr_1.Schema('interaction', getOptions());
exports.draftSchema = new normalizr_1.Schema('draft', getOptions());
exports.messageSchema = new normalizr_1.Schema('message', getOptions());
exports.replySchema = new normalizr_1.Schema('reply', getOptions());
/**
 * Schema setup for Customer
 */
exports.customerSchema = new normalizr_1.Schema('customer', getOptions());
exports.caseChangesSchema = new normalizr_1.Schema('changes', getOptions());
exports.interactionSchema.define({
    case: exports.caseSchema
});
exports.customerSchema.define({
    cases: normalizr_1.arrayOf(exports.caseSchema)
});
exports.caseSchema.define({
    _embedded: {
        customer: exports.customerSchema,
        draft: exports.draftSchema,
        message: exports.messageSchema,
        replies: normalizr_1.arrayOf(exports.interactionSchema),
        foober: exports.customerSchema
    },
});
exports.caseChangesSchema.define({
    new: normalizr_1.arrayOf(exports.caseSchema),
    changed: normalizr_1.arrayOf(exports.caseSchema),
    removed: normalizr_1.arrayOf(exports.caseSchema)
});
exports.appSchema = {
    case: exports.caseSchema,
    interaction: exports.interactionSchema,
    draft: exports.draftSchema,
    message: exports.messageSchema,
    reply: exports.replySchema,
    customer: exports.customerSchema,
    changes: exports.caseChangesSchema
};
