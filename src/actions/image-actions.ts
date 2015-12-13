import api from '../api/image-api';
import * as ACTION_TYPE from '../constants/action-types';
import { apiActionCreator } from '../utils/action-utils';

export const fetchMachineImageList
  = apiActionCreator(ACTION_TYPE.FETCH_MACHINE_IMAGE_LIST, api.fetchMachineImageList);

export const createMachineImage
  = apiActionCreator(ACTION_TYPE.CREATE_MACHINE_IMAGE, api.createMachineImage);
