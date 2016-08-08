
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {ADDING, ADDED, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function add (payload: any, config: ActionConfig) {

  return (dispatch, store) => {

    dispatch(action(ADDING, config.className));
    
    return config.adapter.add(payload, config)
    .then(
      res => {
        dispatch(action(ADDED, config.className));
        return [res.data];
      },
      error => {
        dispatch(action(ERROR, config.className, error));
        return config.promise.reject(error);
      }
    );
  }
}