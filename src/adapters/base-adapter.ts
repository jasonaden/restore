
import {IAdapterPersistence} from './i-adapter-persistence';

/*
* base adapter implementation.
*/
export class BaseAdapter {
  
  /**
   * Persistence adapter that is used to put and retrieve data. These methods need
   * to be implemented by an adapter that extends the BaseAdapter
   */
  persistence: IAdapterPersistence;
  
  /**
   * Promise library to use throughout the adapter
   */
  promise = Promise;

  /**
   * generateSlug is used when storing data in the redux store. It's the key by which the data is put into the store.
   */
  generateSlug (entity): string {
    return entity.id;
  }
    
  /**
   * Default reviver. This function will run when sending back a response such as after 
   * find or findOne, but before the `afterAction` hooks get a hold of the data. 
   */
  reviver (key, value) {
    return value;
  }
  
  /**
   * Convert payload to JSON format
   */
  toJSON (value) {
    if (!value || Array.isArray(value) || typeof value !== 'object') return value;
    let ret = Object.assign({}, value);
    
    // Remove internal "$" properties
    for (let x in ret) {
      if (ret.hasOwnProperty(x) && x[0] === '$') delete ret[x];
    }
    return ret;
  }
  
  /**
   * Lifecycle Hooks:
   * 
   * * `beforeAdd(payload[, cb])`
   * * `afterAdd(payload[, cb])`
   */
  add(data, config?): Promise<any> {
    // run before hook
    return this.promise.all([this.beforeAdd(data, config)])
    // convert to JSON format
    .then(([data, config]) => [this.toJSON(data), config])
    // persist
    .then(([data, config]) => this.persistence.create(data, config))
    // run after hook
    .then(x => this.afterAdd(x));
  }
  
  /**
   * Default hook (return what was passed in). Because .all is being used, 
   * it's possible that `payload` or `config` could be a promise that returns the 
   * payload or config, so it's not a pure identity function.
   */
  beforeAdd(payload, config): Promise<(any)[]> {
    return this.promise.all([payload, config]);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterAdd(data: any): Promise<any> {
    return Promise.resolve(data);
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
    // return this.$http.get('/');
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

