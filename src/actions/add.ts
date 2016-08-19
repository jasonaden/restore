
import {action} from './action';
// import {IResourceRequestConfig} from '../resources/interfaces';
import { 
  IPersistorConfig, 
  IAdapterConfig} from '../resources/interfaces';
import {ADDING, ADDED, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function add (Resource, persistorConfig: IPersistorConfig, adapterConfig?: IAdapterConfig) {

  return (dispatch, store) => {

    dispatch(action(ADDING, Resource.className));
    return Resource.adapter.add(persistorConfig, adapterConfig)
    .then(
      res => {
        dispatch(action(ADDED, Resource.className));
        return res.data;
      },
      error => {
        dispatch(action(ERROR, Resource.className, error));
        return Promise.reject(error);
      }
    );
  }
}