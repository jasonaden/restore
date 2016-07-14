

import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {FINDING_ONE, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

export function findOne (config: ActionConfig, args?: IResourceRequestConfig) {
  return (dispatch, store) => {
    dispatch(action(FINDING_ONE, config.className));
    
    return config.adapter.execute({
      url: config.url, 
      method: 'GET'
    })
    .then(
      res => {
        dispatch(splitSchema(config.schema, config.className, res.data));
        return res.data;
      },
      error => {
        dispatch(action(ERROR, config.className, error));
        return config.$q.reject(error);
      }
    );
  }
}