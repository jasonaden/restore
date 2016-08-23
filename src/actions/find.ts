
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {FINDING_LIST, FOUND_LIST, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function find (Resource, persistorConfig, adapterConfig) {

  return (dispatch, store) => {

    dispatch({type:FINDING_LIST, meta:{uri: adapterConfig.uri}});

    return Resource.adapter.find(persistorConfig, adapterConfig)
    .then(
      res => {
        dispatch({type:FOUND_LIST, meta:{uri: adapterConfig.uri}});
        return res.data;
      },
      error => {
        dispatch(action(ERROR, adapterConfig.listName, error));
        return Promise.reject(error);
      }
    );
  }
}