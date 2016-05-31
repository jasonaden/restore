
/**
 * From ds.Util.getPath
 */
export function getPath (obj, path, setPath?) {
  if (path == null) {
    path = '';
  }
  path = path.split(".");
  var target = obj;
  while (path.length && target) {
    let key = path.shift()
    if (key) {
      if ((typeof target[key] === 'undefined' || !path.length) && typeof setPath !== 'undefined') {
        target[key] = path.length ? {} : setPath;
      }
      target = target[key];
    }
  }
  return target;
}