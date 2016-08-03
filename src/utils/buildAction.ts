import {Action} from 'flux-standard-action';

export function buildAction<T> (type: string, suffix: string, payload?: any): Action<T> {
  return {type: `${type}_${suffix}`, payload};
}