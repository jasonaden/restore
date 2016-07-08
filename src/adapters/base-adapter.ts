
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
   * Convert payload from JSON format
   */
  fromJSON (value) {
    if (typeof value !== 'string') return value;
    
    return JSON.parse(value, this.reviver);
  }
  
  /**
   * Lifecycle Hooks:
   * 
   * * `beforeAdd(payload[, cb])`
   * * `afterAdd(payload[, cb])`
   */
  add(data, params?): Promise<any> {
    return this.beforeAdd(data, params) // run before hook
    .then(([data, params]) => [this.toJSON(data), params]) // convert to JSON format
    .then(([data, params]) => this.persistence.create(data, params)) // persist
    .then(x => this.fromJSON(x)) // revive data from api
    .then(x => this.afterAdd(x)); // run after hook
  }
  
  /**
   * Default hook (return what was passed in). Because .all is being used, 
   * it's possible that `payload` or `params` could be a promise that returns the 
   * payload or params, so it's not a pure identity function.
   */
  beforeAdd(payload, params): Promise<(any)[]> {
    return this.promise.all([payload, params]);
  }
  
  /**
   * Default identity hook (return what was passed in)
   */
  afterAdd(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  find (params?) {
    return this.promise.all([this.beforeFind(params)])
    .then(([params]) => this.persistence.find(params))
    .then(x => this.fromJSON(x))
    .then(x => this.afterFind(x));
  }

  beforeFind(params?): Promise<(any)[]> {
    return this.promise.all([params]);
  }
  
  afterFind(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  findOne (params) {
    return this.promise.all([this.beforeFindOne(params)])
    .then(([params]) => this.persistence.findOne(params))
    .then(x => this.fromJSON(x))
    .then(x => this.afterFindOne(x));
  }

  beforeFindOne(params): Promise<(any)[]> {
    return this.promise.all([params]);
  }
  
  afterFindOne(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  update (data, params?) {
    return this.beforeUpdate(data, params)
    .then(([data, config]) => [this.toJSON(data), config])
    .then(([data, config]) => this.persistence.update(data, config))
    .then(x => this.fromJSON(x))
    .then(x => this.afterUpdate(x));
  }

  beforeUpdate(data, params?): Promise<(any)[]> {
    return this.promise.all([data, params]);
  }
  
  afterUpdate(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  destroy (params) {
    return this.beforeDestroy(params)
    .then(([params]) => this.persistence.destroy(params))
    .then(x => this.fromJSON(x))
    .then(x => this.afterDestroy(x));
  }

  beforeDestroy(params): Promise<(any)[]> {
    return this.promise.all([params]);
  }
  
  afterDestroy(data: any): Promise<any> {
    return Promise.resolve(data);
  }
  
  
  


  // Default interceptors
  interceptors: ng.IHttpInterceptor | ng.IHttpInterceptor[];

}

