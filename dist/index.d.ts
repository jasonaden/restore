export { Resource } from './resources/resource';
export { defaultReducer } from './reducers/resource-reducer';
export { defaultListReducer } from './reducers/resource-list-reducer';
export { defaultGenericListReducer } from './reducers/resource-generic-list-reducer';
export { defaultGenericReducer } from './reducers/resource-generic-reducer';
export { IResourceAdapter, IResourceRequestConfig, IEntityState, IAdapterConfig, IPersistorConfig } from './resources/interfaces';
export { BaseAdapter } from './adapters/base-adapter';
export { $httpPersistor } from './persistors/$http-persistor';
export { $httpPersistorConfig } from './persistors/$http-persistor-config';
export { IPersistor } from './persistors/i-persistor';
export { flattenEmbedded, generateConfig, joinUrl, parseJson, transform } from './utils';
export * from './resources/constants';
