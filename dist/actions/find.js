import { action } from './action';
import { FINDING, ERROR } from '../resources/constants';
import { splitSchema } from '../utils/splitSchema';
export function find(config, args) {
    return (dispatch, store) => {
        dispatch(action(FINDING, config.className));
        // TODO: This should not be tied to an HTTP request. What if the 
        // data needs to be stored in local storage? Should simply tell 
        // the adapter to load something and pass config data.
        return config.adapter.execute(config)
            .then(res => {
            dispatch(splitSchema(config.schema, config.className, res.data));
            return res.data;
        }, error => {
            dispatch(action(ERROR, config.className, error));
            return config.$q.reject(error);
        });
    };
}
