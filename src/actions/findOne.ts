
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {FINDING_ONE, FOUND_ONE, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function findOne (payload: any, config: ActionConfig) {

  return (dispatch, store) => {

    dispatch(action(FINDING_ONE, config.className));
    
    return config.adapter.findOne(payload, config)
    .then(
      res => {
        dispatch(action(FOUND_ONE, config.className));
        return [res.data];
      },
      error => {
        dispatch(action(ERROR, config.className, error));
        return config.promise.reject(error);
      }
    );
  }
}