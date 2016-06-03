export function transform(object, callback) {
    var walk;
    walk = function (object, key) {
        var k, v, value;
        value = object[key];
        if (value && typeof value === 'object') {
            for (k in value) {
                if (!value.hasOwnProperty(k))
                    continue;
                if (typeof (v = walk(value, k)) !== 'undefined') {
                    value[k] = v;
                }
                else {
                    delete value[k];
                }
            }
        }
        return callback.call(object, key, value);
    };
    return walk({
        '': object
    }, '');
}
