import api from '../api/image-api';
import { FETCH_MACHINE_IMAGE_LIST } from '../constants/action-types';
import { apiActionCreator } from '../utils/action-utils';

export const fetchMachineImageList
  = apiActionCreator(FETCH_MACHINE_IMAGE_LIST, api.fetchMachineImageList);
