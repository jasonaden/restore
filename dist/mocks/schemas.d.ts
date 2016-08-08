import { Schema } from 'normalizr';
/**
 * Schema setup for Case
 */
export declare const caseSchema: Schema;
/**
 * Schema setup for Interactions (reply, message, draft)
 */
export declare const interactionSchema: Schema;
export declare const draftSchema: Schema;
export declare const messageSchema: Schema;
export declare const replySchema: Schema;
/**
 * Schema setup for Customer
 */
export declare const customerSchema: Schema;
export declare const appSchema: {
    case: Schema;
    interaction: Schema;
    draft: Schema;
    message: Schema;
    reply: Schema;
    customer: Schema;
};
