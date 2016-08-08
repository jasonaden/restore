
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {DESTROYING, DESTROYED, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function destroy (payload: any, config: ActionConfig) {

  return (dispatch, store) => {

    dispatch(action(DESTROYING, config.className));
    
    return config.adapter.destroy(payload, config)
    .then(
      res => {
        dispatch(action(DESTROYED, config.className));
        return [res.data];
      },
      error => {
        dispatch(action(ERROR, config.className, error));
        return config.promise.reject(error);
      }
    );
  }
}
