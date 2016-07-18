
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {FINDING, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function find (actionConfig: ActionConfig, config?: any) {
  // return thunk
  return (dispatch, store) => {
    // Set a status of "FINDING_RESOURCE_NAME"
    dispatch(action(FINDING, actionConfig.className));
    
    return actionConfig.adapter.find(actionConfig)
    .then(
      res => {
        dispatch(splitSchema(actionConfig.schema, actionConfig.className, res.data || res));
        return [res.data];
      },
      error => {
        dispatch(action(ERROR, actionConfig.className, error));
        return actionConfig.promise.reject(error);
      }
    );
  }
}