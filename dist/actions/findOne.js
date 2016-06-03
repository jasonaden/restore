import { action } from './action';
import { FINDING_ONE, ERROR } from '../resources/constants';
import { splitSchema } from '../utils/splitSchema';
export function findOne(config, args) {
    return (dispatch, store) => {
        dispatch(action(FINDING_ONE, config.className));
        return config.adapter.execute({
            url: config.url,
            method: 'GET'
        })
            .then(res => {
            dispatch(splitSchema(config.schema, config.className, res.data));
            return res.data;
        }, error => {
            dispatch(action(ERROR, config.className, error));
            return config.$q.reject(error);
        });
    };
}
