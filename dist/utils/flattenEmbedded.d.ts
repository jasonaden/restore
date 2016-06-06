/**
 * Takes HAL formatted response data and flattens the embedded data into
 * the base object. Example:
 *
 * ```
 * // Data In:
 * {
 *   _embedded: {
 *     customer: {
 *       id: 1,
 *       name: 'John'
 *     }
 *   },
 *   id: 1,
 *   name: 'John\'s Case'
 * }
 *
 * // Returns:
 * {
 *   _embedded: {
 *     customer: {
 *       id: 1,
 *       name: 'John'
 *     }
 *   },
 *   id: 1,
 *   name: 'John\'s Case'
 *   customer: {
 *     id: 1,
 *     name: 'John'
 *   }
 * }
 *
 * ```
 */
export declare function flattenEmbedded(data: any, headers?: any): any;
