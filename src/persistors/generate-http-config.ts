// TODO: Get rid of $q and ng.IPromise and IResourceRequestConfig. See notes in generateConfig.specx.ts

import {IResourceAdapter, IResourceRequestConfig} from '../resources/interfaces';
import {IHttpPersistorConfig} from './$http-persistor-config';
import {joinUrl} from '../utils/joinUrl';

export function generateHttpConfig ($q: ng.IQService, config: IResourceRequestConfig): ng.IPromise<IResourceRequestConfig> {
  
  config = Object.assign({}, config);
  
  config.url = joinUrl(config.url, config.baseUrl);
  
  // Add default transforms
  // for (let method of ['transformRequest', 'transformResponse']) {
  //   if (config[method]) {
  //     config[method] = [].concat(adapter[method].bind(adapter), config[method]);
  //   } else {
  //     console.log('!!!!!!!!');
  //     console.log(method);
  //     config[method] = adapter[method].bind(adapter);
  //   }
  // }
    
  // Set up config interceptors. These will be the first interceptors to run.
  let interceptors: ng.IHttpInterceptor[];
  if (Array.isArray(config.interceptors)) {
    interceptors = <ng.IHttpInterceptor[]>config.interceptors;
  } else {
    interceptors = [config.interceptors];
  }
  
  // Sometimes the config will pass in additional interceptors. Concatinate
  // those interceptors here into the local `interceptors` array. They will 
  // then be run below when we re-create the config.interceptor object
  // as an IHttpInterceptor object.
  if (config.interceptors) {
    interceptors = interceptors.concat(config.interceptors);
  }
  
  // Create a single "interceptors" object that will iterate over the 
  // interceptors defined above (combination of adapter and config
  // interceptors). We are essentially taking the `response` and 
  // `responseError` properties of each interceptor object and adding
  // each of those callbacks to the promise chain.
  config.interceptor = {
    response: (response): ng.IPromise<any> => {
      let promise = $q.when(response)
      let icptr: ng.IHttpInterceptor;
      for (icptr of interceptors) {
        if (icptr.response) {
          promise = promise.then(icptr.response);
        }
      }
      return promise;
    },
    responseError: (response) => {
      let promise = $q.reject(response)
      let icptr: ng.IHttpInterceptor;
      for (icptr of interceptors) {
        if (icptr.responseError) {
          promise = promise.catch(icptr.responseError)
        }
      }
      return promise;
    }
  };
  
  // Config could be deferred by a request interceptor
  let request = $q.when(config);
  
  // Add request interceptors immediately. They will receive the `config` object 
  // and can modify it as they resolve their promises.
  let icptr: ng.IHttpInterceptor;
  for (icptr of interceptors) {
    if (icptr && icptr.request) {
      request = request.then(icptr.request)
    }
  }
  
  return request;
}