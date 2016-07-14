
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {ADDING, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

// TODO: Implement this function. Need to configure what to do after adding.
export function add (actionConfig: ActionConfig, payload: any, args?: any) {
  return (dispatch, store) => {
    dispatch(action(ADDING, actionConfig.className));
    
    return actionConfig.adapter.add(payload, args)
    .then(
      res => {
        
        alert("Need to implement what to do after ADD (ADD TO STORE)");
        dispatch(splitSchema(actionConfig.schema, actionConfig.className, res.data));
        return res.data;
      },
      error => {
        alert('Error adding!');
        dispatch(action(ERROR, actionConfig.className, error));
        return actionConfig.promise.reject(error);
      }
    );
  }
}