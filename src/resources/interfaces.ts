import {ResourceAdapterConfig} from './resource-adapter-config';
/**
 * Instance configuration for a ResourceAdapter. These are the configurable properties
 * that can be adjusted in the constructor for a Resource Adapter.
 * 
 * ```
 * let config = {
 *   baseUrl: '/api/v2',
 *   removeTrailingSlash: false
 * }
 * 
 * let adapter = new ResourceAdapter(config, ... );
 * 
 * let myResource = new Resource($injector, adapter, schema);
 * ``` 
 */
export interface IResourceAdapterConfig {
  baseUrl: string,
  removeTrailingSlash?: boolean,
  datePattern?: RegExp
}

/**
 * Interface for creating a ResourceAdapter. ResourceAdapters are the glue that 
 * ties a back-end (API) to the Resource processing and data storage on the front
 * end. An Adapter could be used on it's own, but typically would be used in the 
 * context of a Resource of some kind.
 * 
 * ```
 * class Case extends Resource {
 *   ...
 *   constructor(..., ApiV2Adapter: IResourceAdapter) {
 *     ...
 *   }
 *   ...
 * }
 * ```
 * 
 */
export interface IResourceAdapter extends IResourceAdapterConfig {
  /**
   * Pass-through for running a request or doing whatever action this Adapter does
   * to send or receive data. In the case of an API adapter, it's likely going to 
   * run doRequest() method. But in some cases there might be another method such 
   * as for storage of data in Local Storage (LocalStorageAdapter). The `execute()` 
   * method gives a single interface for executing on actions.
   */
  generateSlug: (entity: any) => string;
  execute: (config: any) => ng.IPromise<any>;
  reviver: (key: string, value: any) => any;
  doRequest: (config: IResourceRequestConfig) => ng.IPromise<any>;
  transformResponse: (data: any, headers: any) => any;
  transformRequest: (data: any, headers: any) => any;
  interceptors: ng.IHttpInterceptor | ng.IHttpInterceptor[];
}

/**
 * Extend the base Angular RequestConfig object slightly to include
 * a few additional configurations.
 * 
 * Note that with Angular's $http service, interceptors are only at 
 * the provider level. But with our ResourceRequestConfig object they
 * are also available at the individual request level.
 */
export interface IResourceRequestConfig extends ng.IRequestConfig {
  /**
   * Base URL added to all requests. E.g. `/api/v2`
   */
  baseUrl?: string;
  /**
   * Leave or remove a trailing slash at the end of a URL.
   */
  removeTrailingSlash?: boolean;
  /**
   * Date pattern to be used when parsing JSON return.
   */
  datePattern?: RegExp;
  /**
   * Instance level interceptors. Behaves the same as those documented
   * here on the [Angular Docs](https://docs.angularjs.org/api/ng/service/$http)
   */
  interceptors?: ng.IHttpInterceptor | ng.IHttpInterceptor[];
  /**
   * This interceptor will be overwritten at runtime. When the request is being 
   * created any interceptors on the Adapter are combined with interceptor(s) on
   * the Config object and all are added to this `interceptor` property.
   */
  interceptor?: ng.IHttpInterceptor;
}

export interface IEntityState {
  result: string[],
  loadingMany: boolean,
  loadingOne: boolean,
  deleting: boolean,
  patching: boolean,
  adding: boolean,
  items: {[key: string]: any},
  meta?: {
    count?: number,
    page?: number,
    links: {
      [key: string]: {href: string, class?: string},
      self: {href: string, class?: string}
    }
  }
}
