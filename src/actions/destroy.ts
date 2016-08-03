
import {action} from './action';
import {IResourceRequestConfig} from '../resources/interfaces';
import {DESTROYING, ERROR} from '../resources/constants';
import {splitSchema} from '../utils/splitSchema';
import {ActionConfig} from './action-config';

// TODO: Implement this function. Need to configure what to do after destroying server-side.
export function destroy (config: ActionConfig, id: string | number, args?: IResourceRequestConfig) {
  return (dispatch, store) => {
    dispatch(action(DESTROYING, config.className));
    
    // 8/3/16: da: commented out because the adapter doesn't currenty have an execute()
    //  method
    // return config.adapter.execute({
    //   url: id, 
    //   method: 'DELETE'
    // })
    // .then(
    //   res => {
        
    //     alert("Need to implement what to do after delete (remove from store)");
    //     dispatch(splitSchema(config.schema, config.className, res.data));
    //     return res.data;
    //   },
    //   error => {
    //     dispatch(action(ERROR, config.className, error));
    //     return config.promise.reject(error);
    //   }
    // );
  }
}