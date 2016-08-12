
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {PATCHING, PATCHED, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function update (Resource, config: ActionConfig) {

  return (dispatch, store) => {

    dispatch(action(PATCHING, config.className));
    
    return Resource.adapter.update(config)
    .then(
      res => {
        dispatch(action(PATCHED, config.className));
        return res.data;
      },
      error => {
        dispatch(action(ERROR, config.className, error));
        return config.promise.reject(error);
      }
    );
  }
}