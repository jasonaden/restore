
import {IAdapterPersistence} from './i-adapter-persistence';

export class BaseAdapterPersistence implements IAdapterPersistence {
  create (data, options?) {
    data = Object.assign({}, data, {created: true});
    return Promise.resolve(this.toJSON(data));
  }

  update (data, options?, base?) {
    data = Object.assign({}, data, {updated: true});
    return Promise.resolve(data);
  }
  
  findOne (options) {
    return  Promise.resolve({id: 123});
  }

  find (options) {
    return Promise.resolve([{id: 123}, {id: 456}]);
  }

  destroy (params) {
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
