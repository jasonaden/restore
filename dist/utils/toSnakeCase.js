import { tokenize } from './tokenize';
export function toSnakeCase(string) {
    if (string) {
        return tokenize(string).replace(/[ ]/g, '_').toLowerCase();
    }
}
