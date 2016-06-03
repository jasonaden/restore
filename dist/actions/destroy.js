import { action } from './action';
import { DESTROYING, ERROR } from '../resources/constants';
import { splitSchema } from '../utils/splitSchema';
// TODO: Implement this function. Need to configure what to do after destroying server-side.
export function destroy(config, id, args) {
    return (dispatch, store) => {
        dispatch(action(DESTROYING, config.className));
        return config.adapter.execute({
            url: id,
            method: 'DELETE'
        })
            .then(res => {
            alert("Need to implement what to do after delete (remove from store)");
            dispatch(splitSchema(config.schema, config.className, res.data));
            return res.data;
        }, error => {
            dispatch(action(ERROR, config.className, error));
            return config.$q.reject(error);
        });
    };
}
