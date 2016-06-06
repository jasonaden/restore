
import * as request from 'request';

import {joinUrl, parseJson, generateConfig} from '../utils';

import {IResourceAdapter, IResourceAdapterConfig, IResourceRequestConfig} from '../resources/interfaces';



let configDefaults = {
  baseUrl: "/", 
  removeTrailingSlash: true,
  datePattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
}


/*
* Request-based adapter for an API.
*/
export class RequestAdapter {

  // Base URL for the API
  baseUrl: string;
  // Do or don't remove trailing slash 
  removeTrailingSlash: boolean;
  // Date pattern to be used to find dates in returns from the API
  datePattern: RegExp;
  
  constructor ({baseUrl = configDefaults.baseUrl, removeTrailingSlash, datePattern}) {
    this.baseUrl
    
    if (!this.interceptors) {
      this.interceptors = [];  
    }
  }

  generateSlug (entity): string {
    return entity.id;
  }

  // Execute request based on given DsResourceAdapterConfig
  execute (config: any): Promise {
    let requestConfig = this.config.extend(config).build();
    return this.doRequest(requestConfig);
  }
    
  // Default reviver (override this)
  reviver (key, value) {
    return value;
  }
  
  doRequest (config: IResourceRequestConfig): Promise {
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
  
  find (config, params) {
    request
  }
  
  findOne () {
    
  }
  
  create () {
    
  }
  
  update () {
    
  }
  
  destroy () {
    
  }
  
  
  


  // Default interceptors
  interceptors: ng.IHttpInterceptor | ng.IHttpInterceptor[];

}

