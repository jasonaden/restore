import {tokenize} from './tokenize';

export function toLoudSnakeCase (string) {
  if (string) {
    return tokenize(string).replace(/[ ]/g, '_').toUpperCase();
  }
}