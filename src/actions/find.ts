
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {FINDING, FOUND, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function find (ResourceList, config: ActionConfig) {

  return (dispatch, store) => {

    dispatch(action(FINDING, ResourceList.listName));

    return ResourceList.adapter.find(config)
    .then(
      res => {
        dispatch(action(FOUND, config.className));
        return [res.data];
      },
      error => {
        dispatch(action(ERROR, config.className, error));
        return config.promise.reject(error);
      }
    );
  }
}