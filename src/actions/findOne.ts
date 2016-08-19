
import {action} from './action';
import { 
  IPersistorConfig, 
  IAdapterConfig} from '../resources/interfaces';
import {FINDING_ONE, FOUND_ONE, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';


export function findOne (Resource, persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig) {

  return (dispatch, store) => {

    dispatch(action(FINDING_ONE, Resource.className));
    return Resource.adapter.findOne(persistorConfig, adapterConfig)
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