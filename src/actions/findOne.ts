
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {FINDING_ONE, FOUND_ONE, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function findOne (Resource, config: ActionConfig) {

  return (dispatch, store) => {

    dispatch(action(FINDING_ONE, Resource.className));
    
    return Resource.adapter.findOne(config)
    .then(
      res => {
        dispatch(action(FOUND_ONE, Resource.className));
        return res.data;
      },
      error => {
        dispatch(action(ERROR, Resource.className, error));
        return Promise.reject(error);
      }
    );
  }
}