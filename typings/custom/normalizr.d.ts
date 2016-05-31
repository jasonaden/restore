declare module Normalizr {
    export class Schema {
        constructor(name: String, options?: any)
        define: (Object) => void;
    }
    export function arrayOf(obj: any);
    export function normalize(obj: Object, schema: any);
}

declare module 'normalizr' {
    export = Normalizr
}