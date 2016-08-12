
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {FINDING, FOUND, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function find (Resource, persistorConfig, adapterConfig) {

  return (dispatch, store) => {

    dispatch(action(FINDING, adapterConfig.listName));

    return Resource.adapter.find(persistorConfig, adapterConfig)
    .then(
      res => {
        dispatch(action(FOUND, adapterConfig.listName));
        return res.data;
      },
      error => {
        dispatch(action(ERROR, adapterConfig.listName, error));
        return Promise.reject(error);
      }
    );
  }
}