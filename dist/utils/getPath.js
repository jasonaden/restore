"use strict";
/**
 * From ds.Util.getPath
 */
function getPath(obj, path, setPath) {
    if (path === void 0) { path = ""; }
    var aPath = path.split(".");
    var target = obj;
    while (aPath.length && target) {
        var key = aPath.shift();
        if (key) {
            if ((typeof target[key] === 'undefined' || !aPath.length) && typeof setPath !== 'undefined') {
                target[key] = aPath.length ? {} : setPath;
            }
            target = target[key];
        }
    }
    return target;
}
exports.getPath = getPath;
