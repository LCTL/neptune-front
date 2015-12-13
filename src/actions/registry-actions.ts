import api from '../api/registry-api';
import * as ACTION_TYPE from '../constants/action-types';
import { apiActionCreator } from '../utils/action-utils';

export const searchImages
  = apiActionCreator(ACTION_TYPE.SEARCH_REGISTRY_IMAGES, api.searchImages);
