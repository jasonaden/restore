
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {PATCHING, PATCHED, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function update (Resource, persistorConfig, adapterConfig) {

  return (dispatch, store) => {

    dispatch(action(PATCHING, Resource.className));
    
    return Resource.adapter.update(persistorConfig, adapterConfig)
    .then(
      res => {
        dispatch(action(PATCHED, Resource.className, false));
        return res.data;
      },
      error => {
        dispatch(action(ERROR, Resource.className, error));
        return Promise.reject(error);
      }
    );
  }
}