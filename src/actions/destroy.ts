
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {DESTROYING, DESTROYED, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function destroy (Resource, persistorConfig, adapterConfig) {

  return (dispatch, store) => {

    dispatch(action(DESTROYING, adapterConfig.listName));
    
    return Resource.adapter.destroy(persistorConfig, adapterConfig)
    .then(
      res => {
        dispatch(action(DESTROYED, adapterConfig.listName));
        return [res.data];
      },
      error => {
        dispatch(action(ERROR, adapterConfig.listName, error));
        return Promise.reject(error);
      }
    );
  }
}
