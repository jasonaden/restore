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
export function flattenEmbedded(data, headers) {
    if (!data || !data._embedded)
        return data;
    // Verify this is HAL and check if we're dealing with embedded 
    // objects (like from an endpoint returning multiple entries)
    if (data._embedded.entries && Array.isArray(data._embedded.entries)) {
        data._embedded.entries = data._embedded.entries.map(flatten);
    }
    // Then always flatten
    return flatten(data);
    function flatten(data) {
        if (data._embedded) {
            for (let key in data._embedded) {
                data[key] = data._embedded[key];
            }
        }
        return data;
    }
}
