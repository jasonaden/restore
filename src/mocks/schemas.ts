import {Schema, arrayOf} from 'normalizr';
import {generateSlug} from './schemas_helpers';

// Default options
let getOptions = (overrides = {}) => {
  let options = {
    idAttribute: generateSlug
  };
  return Object.assign(options, overrides);
}

/**
 * Schema setup for Case
 */
export const caseSchema = new Schema('case', getOptions());
/**
 * Schema setup for Interactions (reply, message, draft)
 */
export const interactionSchema = new Schema('interaction', getOptions());
export const draftSchema = new Schema('draft', getOptions());
export const messageSchema = new Schema('message', getOptions());
export const replySchema = new Schema('reply', getOptions());
/**
 * Schema setup for Customer
 */
export const customerSchema = new Schema('customer', getOptions());
export const userSchema = new Schema('user', getOptions());

export const caseChangesSchema = new Schema('changes', getOptions());


interactionSchema.define({
  case: caseSchema
});

customerSchema.define({
  cases: arrayOf(caseSchema)
});

caseSchema.define({
  _embedded: {
    customer: customerSchema, 
    draft: draftSchema,
    message: messageSchema, 
    replies: arrayOf(interactionSchema),
    foober: customerSchema
  },  
});

caseChangesSchema.define( {
  new: arrayOf(caseSchema),
  changed: arrayOf(caseSchema),
  removed: arrayOf(caseSchema)
})

export const appSchema = {
  case: caseSchema, 
  interaction: interactionSchema, 
  draft: draftSchema,
  message: messageSchema,
  reply: replySchema,
  customer: customerSchema,
  user: userSchema,
  changes: caseChangesSchema
}