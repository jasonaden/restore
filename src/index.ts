// Resource class
export {
  Resource
} from './resources/resource';

// resource reducer
export {
  defaultReducer
} from './resources/resource-reducer';

// interfaces
// don't need to export since they will be in .d.ts file?
/*
export {
  IResourceAdapter, 
  IResourceAdapterConfig, 
  IResourceRequestConfig,
  IEntityState
} from './resources/interfaces';*/

// resource-adapter
export {
  ResourceAdapter
} from './resources/resource-adapter';

// utils
export {
  flattenEmbedded, 
  generateConfig, 
  joinUrl, 
  parseJson, 
  transform
} from './utils';

export * from './resources/constants';