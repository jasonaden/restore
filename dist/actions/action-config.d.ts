import { IResourceAdapter } from '../resources/interfaces';
export declare type ActionConfig = {
    adapter: IResourceAdapter;
    adapterConfig?: any;
    schema: any;
    className: string;
    promise: PromiseConstructor;
};
