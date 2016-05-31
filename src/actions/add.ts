
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {ADDING, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {config} from './action-config';

// TODO: Implement this function. Need to configure what to do after adding.
export function add (config: config, payload: any, args?: IResourceRequestConfig) {
  return (dispatch, store) => {
    dispatch(action(ADDING, config.className));
    
    return config.adapter.execute({
      url: config.url, 
      method: 'POST'
    })
    .then(
      res => {
        
        alert("Need to implement what to do after ADD (ADD TO STORE)");
        dispatch(splitSchema(config.schema, config.className, res.data));
        return res.data;
      },
      error => {
        alert('Error adding!');
        dispatch(action(ERROR, config.className, error));
        return config.$q.reject(error);
      }
    );
  }
}