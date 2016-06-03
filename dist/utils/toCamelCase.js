import { tokenize } from './tokenize';
export function toCamelCase(string) {
    if (!string) {
        return;
    }
    string = tokenize(string).replace(/[ ](\w)/g, (g0, g1, g2) => g1.toUpperCase());
    return string = string[0].toLowerCase() + string.slice(1);
}
