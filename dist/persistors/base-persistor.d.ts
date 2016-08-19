import { IPersistor } from './i-persistor';
import { IPersistorConfig } from '../resources/interfaces';
export declare class BasePersistor implements IPersistor {
    create(data: any, options?: any): PromiseLike<any>;
    update(data: any, options?: any, base?: any): PromiseLike<any>;
    findOne(persistorConfig: IPersistorConfig): PromiseLike<any>;
    find(persistorConfig: IPersistorConfig): PromiseLike<any[]>;
    destroy(params: any): PromiseLike<any>;
    /**
     * Default reviver. This function will run when sending back a response such as after
     * find or findOne, but before the `afterAction` hooks get a hold of the data.
     */
    reviver(key: any, value: any): any;
    /**
     * Convert payload to JSON format
     */
    toJSON(value: any): any;
    /**
     * Convert payload from JSON format
     */
    fromJSON(value: any): any;
}
