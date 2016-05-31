
import * as ng from 'angular';

import {transform} from './transform';

export function parseJson (
  datePattern: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, 
  revive: (key: string, value: any) => any = (k, v) => v, 
  data: any, 
  headers
) {
  var reviver = function (key, value) {
    if (typeof value == 'string' && value.match(datePattern)) {
      return new Date(value);
    } else {
      return revive.call(this, key, value)
    }
  }
    
  var data;
  if (typeof data === 'string') {
    data = JSON.parse(data, reviver); 
  } else if (data != null) {
    transform(data, reviver)
  }
  
  // TODO: Determine if we really want to do this or if it should always return data
  if (!(ng.equals({}, data) || ng.equals([], data))) {
    return data
  }
  
}

