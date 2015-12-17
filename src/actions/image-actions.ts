import api from '../api/image-api';
import * as ACTION_TYPE from '../constants/action-types';
import { apiActionCreator } from '../utils/action-utils';

export const fetchMachineImageList
  = apiActionCreator(ACTION_TYPE.FETCH_MACHINE_IMAGE_LIST, api.fetchMachineImageList);

export const pullMachineImage
  = apiActionCreator(ACTION_TYPE.PULL_MACHINE_IMAGE, api.createMachineImage);

export const setShowAll = (showAll: boolean) => ({
  type: ACTION_TYPE.SET_SHOW_ALL_IMAGE,
  value: showAll
})
