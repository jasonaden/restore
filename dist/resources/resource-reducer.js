import { FIND_ONE, FINDING_ONE, FIND, FINDING, ADD, ADDING, DESTROYING, PATCHING } from './constants';
function defaultEntityState() {
    return {
        result: [],
        loadingMany: false,
        loadingOne: false,
        deleting: false,
        patching: false,
        adding: false,
        items: {},
    };
}
/**
 * Generic reducer for items of any type (entities). Produces a state tree like:
 *
 * ```
 *  entities = {
 *    cases: {
 *      // sequence of cases as returned from most recent API call
 *      result: [6, 3, 5, ...],
 *      loadingMany: true,
 *      loadingOne: true,
 *      deleting: false,
 *      patching: false,
 *      adding: false,
 *      items: {
 *        3: {...},
 *        5: {...},
 *        6: {...},
 *        ...
 *      },
 *      meta: {
 *        count: 100,
 *        page: 2,
 *        links: {
 *          ...
 *        }
 *      }
 *    }
 *  }
 * ```
 */
export function defaultReducer(type) {
    /**
     * Simple function for concatinating the type const with the type value.
     *
     * ```
     *  t("LOADING_SOMETHING", "CASE"); // returns LOADING_SOMETHING_CASE
     * ```
     */
    function t(str, type) {
        return str + '_' + type;
    }
    return (state = defaultEntityState(), action) => {
        let s = Object.assign({}, state);
        if (!action) {
            return state;
        }
        switch (action.type) {
            // SETUP ACTIONABLE ITEMS
            case `${FINDING}_${type}`:
                return Object.assign(s, { loadingMany: true });
            case `${FINDING_ONE}_${type}`:
                return Object.assign(s, { loadingOne: true });
            case `${DESTROYING}_${type}`:
                return Object.assign(s, { deleting: true });
            case `${PATCHING}_${type}`:
                return Object.assign(s, { patching: true });
            case `${ADDING}_${type}`:
                return Object.assign(s, { adding: true });
            // This is the load many action. FIND_CASE for instance vs FIND_ONE_CASE.
            case t(FIND, type):
                // Turn off loading indicator
                s.loadingMany = false;
                // Apply the sequenced result array
                s.result = action.payload.result.slice(0);
                // Iterate results and add each item
                s.items = Object.assign({}, s.items);
                s.result.forEach((key) => {
                    s.items[key] = action.payload.items[key];
                });
                // Apply metadata
                s.meta = Object.assign({}, action.payload.meta);
                return s;
            case t(FIND_ONE, type):
                debugger;
                return s;
            case t(ADD, type):
                s.items = Object.assign({}, s.items);
                s.items[action.payload._links.self.href] = action.payload;
                return s;
            // TODO: ERROR CASE
            default:
                return state;
        }
    };
}
