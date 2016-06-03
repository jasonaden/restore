import { transform } from './transform';
export function parseJson(datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, revive = (k, v) => v, data, headers) {
    var reviver = function (key, value) {
        if (typeof value == 'string' && value.match(datePattern)) {
            return new Date(value);
        }
        else {
            return revive.call(this, key, value);
        }
    };
    var data;
    if (typeof data === 'string') {
        data = JSON.parse(data, reviver);
    }
    else if (data != null) {
        transform(data, reviver);
    }
    return data;
}
