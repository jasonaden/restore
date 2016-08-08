export interface IPersistor {
    create: (data, params?) => PromiseLike<any>;
    update: (data, params?, base?) => PromiseLike<any>;
    findOne: (params) => PromiseLike<any>;
    find: (params) => PromiseLike<any>;
    destroy: (params) => PromiseLike<any>;
    toJSON?: (data) => string;
    fromJSON?: (value: string | any) => any;
    reviver?: (key: string, value: any) => any;
}
