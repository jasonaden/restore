export function action<T> (type: string, suffix: string, payload?: any): Action<T> {
  return {type: `${type}_${suffix}`, payload};
}
