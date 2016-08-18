// Resource class
export {
  Resource
} from './resources/resource';

// resource reducer
export {
  defaultReducer
} from './reducers/resource-reducer';

// resource-list reducer
export {
  defaultListReducer
} from './reducers/resource-list-reducer';

export {
  IResourceAdapter, 
  IResourceRequestConfig,
  IEntityState,
  IAdapterConfig,
  IPersistorConfig
} from './resources/interfaces';

// base adapter
export { BaseAdapter } from './adapters/base-adapter';

// $http sample persistor
export { $httpPersistor } from './persistors/$http-persistor';
export { $httpPersistorConfig } from './persistors/$http-persistor-config';
export { IPersistor } from './persistors/i-persistor';

// utils
export {
  flattenEmbedded, 
  generateConfig, 
  joinUrl, 
  parseJson, 
  transform
} from './utils';

export * from './resources/constants';