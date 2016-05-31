
import {joinUrl, parseJson, generateConfig} from './utils';

import {IResourceAdapter, IResourceAdapterConfig, IResourceRequestConfig} from './interfaces';
import {ResourceAdapterConfig} from './resource-adapter-config';

/*
* Base Adapter for an API. The adapter handles
*/
export class ResourceAdapter implements IResourceAdapter {

  // Base URL for the API
  baseUrl: string = "/";
  // Do or don't remove trailing slash 
  removeTrailingSlash: boolean = true;
  // Date pattern to be used to find dates in returns from the API
  datePattern: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  
  constructor (public $http: ng.IHttpService, public $q: ng.IQService, public config: ResourceAdapterConfig = new ResourceAdapterConfig()) {
    if (!this.interceptors) {
      this.interceptors = [];  
    }
  }

  generateSlug (entity): string {
    return entity.id;
  }

  // Execute request based on given DsResourceAdapterConfig
  execute (config: any): ng.IPromise<any> {
    let requestConfig = this.config.extend(config).build();
    return this.doRequest(requestConfig);
  }
    
  // Default reviver (override this)
  reviver (key, value) {
    return value;
  }
  
  doRequest (config: IResourceRequestConfig): ng.IPromise<any> {
    return generateConfig(this.$q, this, config)
    .then(config => this.$http(config)
      .then(config.interceptor.response, config.interceptor.responseError)
    );
  }
  

  // Default response transform
  transformResponse (data, headers) {
    return parseJson(this.datePattern, this.reviver, data, headers);
  }

  // Default request transform
  transformRequest (data, headers) {
    return JSON.stringify(data, (key, value) => {
      if (['@viewModel','@descriptor'].indexOf(key) == -1) {
        return value;
      }
    });
  }


  // Default interceptors
  interceptors: ng.IHttpInterceptor | ng.IHttpInterceptor[];

}

