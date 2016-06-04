export { Resource } from './resources/resource';
export { defaultReducer } from './resources/resource-reducer';
export { IResourceAdapter, IResourceAdapterConfig, IResourceRequestConfig, IEntityState } from './resources/interfaces';
export { ResourceAdapter } from './resources/resource-adapter';
export { flattenEmbedded, generateConfig, joinUrl, parseJson, transform } from './utils';
export * from './resources/constants';

declare function requireAll(r: any): any;

export { joinUrl } from './utils/joinUrl';
export { transform } from './utils/transform';
export { parseJson } from './utils/parseJson';
export { flattenEmbedded } from './utils/flattenEmbedded';
export { generateConfig } from './utils/generateConfig';

import { IResourceRequestConfig } from '../resources/interfaces';
import { config } from './action-config';
export declare function add(config: config, payload: any, args?: IResourceRequestConfig): (dispatch: any, store: any) => any;

import { IResourceRequestConfig } from '../resources/interfaces';
import { config } from './action-config';
export declare function destroy(config: config, id: string, args?: IResourceRequestConfig): (dispatch: any, store: any) => any;

import { IResourceRequestConfig } from '../resources/interfaces';
import { config } from './action-config';
export declare function find(config: config, args?: IResourceRequestConfig): (dispatch: any, store: any) => any;

import { IResourceRequestConfig } from '../resources/interfaces';
import { config } from './action-config';
export declare function findOne(config: config, args?: IResourceRequestConfig): (dispatch: any, store: any) => any;


export declare const FIND_ONE: string;
export declare const FINDING_ONE: string;
export declare const FOUND_ONE: string;
export declare const FIND: string;
export declare const FINDING: string;
export declare const FOUND: string;
export declare const ADD: string;
export declare const ADDING: string;
export declare const ADDED: string;
export declare const DESTROY: string;
export declare const DESTROYING: string;
export declare const DESTROYED: string;
export declare const PATCH: string;
export declare const PATCHING: string;
export declare const PATCHED: string;
export declare const UPDATE: string;
export declare const UPDATING: string;
export declare const UPDATED: string;
export declare const REFRESH: string;
export declare const REFRESHING: string;
export declare const REFRESHED: string;
export declare const ERROR: string;



import 'angular-mocks';

import { Reducer } from 'redux';
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
export declare function defaultReducer<T>(type: string): Reducer;

import 'angular-mocks';



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



/**
 * From ds.Util.getPath
 */
export declare function getPath(obj: any, path?: string, setPath?: any): any;


/**
 * Join a URL with a baseURL. You can also optionally leave a trailing slash at the end of a URL.
 *
 * <p>If the url fragment begins with a special char, don't join with a slash.</p>
 *
 * <p> For example, if baseUrl was '/resources' and url was '.json', you'd want '/resources.json'</p>
*/
export declare function joinUrl(url: string, baseUrl?: string, removeTrailingSlash?: boolean): string;


export declare function mapQueryParams(params: any, queryMap: any): any;

export declare function parseJson(datePattern: RegExp, revive: (key: string, value: any) => any, data: any, headers: any): any;


export declare function splitSchema(schema: any, name: string, data: any): (dispatch: any, store: any) => void;

export declare function toCamelCase(string: any): any;


export declare function toLoudSnakeCase(string: any): string;

export declare function toSnakeCase(string: any): string;

export declare function tokenize(str?: string, ignorePattern?: string): string;


export declare function transform(object: any, callback: any): any;

