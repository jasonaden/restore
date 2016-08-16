
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {DESTROYING, DESTROYED, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function destroy (Resource, persistorConfig, adapterConfig) {

  return (dispatch, store) => {

    dispatch(action(DESTROYING, Resource.className));
    
    return Resource.adapter.destroy(persistorConfig, adapterConfig)
    .then(
      res => {
        dispatch(action(DESTROYED, Resource.className));
        return res;
      },
      error => {
        dispatch(action(ERROR, Resource.className, error));
        return Promise.reject(error);
      }
    );
  }
}
