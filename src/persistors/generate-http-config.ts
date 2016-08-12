// TODO: Get rid of $q and ng.IPromise and IResourceRequestConfig. See notes in generateConfig.specx.ts

import {IResourceAdapter, IResourceRequestConfig} from '../resources/interfaces';
import {IHttpPersistorConfig} from './$http-persistor-config';
import {joinUrl} from '../utils/joinUrl';


export function generateHttpConfig ($q: ng.IQService, config: IResourceRequestConfig): ng.IPromise<IResourceRequestConfig> {

  config = Object.assign({}, config);
  
  config.url = joinUrl(config.url, config.baseUrl);
  
  // TODO: Doesn't seem to be needed, but leaving in case needed when working 
  //  with the real app data. Note if we do use it, need to add the $http service
  //  as an argument to generateHttpConfig.
  // if( config.transformRequest ) {
  //   config.transformRequest = appendTransform($http.defaults.transformRequest, config.transformRequest)
  // }

   
  // Set up config interceptors. These will be the first interceptors to run.
  let interceptors: ng.IHttpInterceptor[];
  if (Array.isArray(config.interceptors)) {
    interceptors = <ng.IHttpInterceptor[]>config.interceptors;
  } else {
    interceptors = [config.interceptors];
  }

  // TODO: 7/27/16:   
  // Sometimes the config will pass in additional interceptors. Concatinate
  // those interceptors here into the local `interceptors` array. They will 
  // then be run below when we re-create the config.interceptor object
  // as an IHttpInterceptor object.
  // if (config.interceptors) {
  //   interceptors = interceptors.concat(config.interceptors);
  // }
  
  // TODO: 7/28/16: Some of the following code was adapted from agent v3. 
  //  See DsResourceAdapater  which is in ds-resources2 and may only be 
  //  used in a limited number of places in agent. May be able to follow 
  //  that pattern to make this work but am not pursuing it now until we 
  //  see with a real world use-case that it is needed. In the $http Angular
  //  service, interceptors can only be set through the $httpProvider, not
  //  on the instance so this would extend that. 

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


// TODO: May not need this -- it preserves the default transform function but things
//  seem to be working fine without explicitly preserving it. 
function appendTransform(defaults, transform) {

  // We can't guarantee that the default transformation is an array
  let existingTransforms = angular.isArray(defaults) ? defaults : [defaults];

  // Append the new transformation to the defaults
  return existingTransforms.concat(transform);
}