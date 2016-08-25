
import {action} from './action';
import { 
  IPersistorConfig, 
  IAdapterConfig} from '../resources/interfaces';
import {FINDING_ONE, FOUND_ONE, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';


export function findOne (Resource, persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig) {

  return (dispatch, store) => {

    dispatch({type: FINDING_ONE, meta: {className:Resource.className}});
    return Resource.adapter.findOne(persistorConfig, adapterConfig)
    .then(
      res => {
        dispatch({type: FOUND_ONE, meta: {className:Resource.className}});
        return res.data;
      },
      error => {
        dispatch({type: ERROR, meta: {className:Resource.className}, error});
        return Promise.reject(error);
      }
    );
  }
}