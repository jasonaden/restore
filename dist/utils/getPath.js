/**
 * From ds.Util.getPath
 */
export function getPath(obj, path = "", setPath) {
    let aPath = path.split(".");
    var target = obj;
    while (aPath.length && target) {
        let key = aPath.shift();
        if (key) {
            if ((typeof target[key] === 'undefined' || !aPath.length) && typeof setPath !== 'undefined') {
                target[key] = aPath.length ? {} : setPath;
            }
            target = target[key];
        }
    }
    return target;
}
