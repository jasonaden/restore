
import {IPersistor} from './i-persistor';

export class BasePersistor implements IPersistor {
  create (data, options?): PromiseLike<any> {
    data = Object.assign({}, data, {created: true});
    return Promise.resolve(this.toJSON(data));
  }

  // update (data, options?, base?): ng.IPromise<any> {
  update (data, options?, base?): PromiseLike<any> {
    data = Object.assign({}, data, {updated: true});
    return Promise.resolve(data);
  }
  
  findOne (options): PromiseLike<any> {
    // Do some work to get data and then resolve it
    return  Promise.all([{id: 123}]);
  }

  find (options): PromiseLike<any[]> {
    return Promise.resolve([{id: 123}, {id: 456}]);
  }

  destroy (params): PromiseLike<any> {
    return Promise.resolve(undefined);
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
  
}
