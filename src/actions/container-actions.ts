import api from '../api/container-api';
import {
  FETCH_MACHINE_CONTAINER_LIST,
  CREATE_MACHINE_CONTAINER,
  SET_SHOW_ALL_CONTAINERS
} from '../constants/action-types';
import { apiActionCreator } from '../utils/action-utils';

export const fetchMachineContainerList
  = apiActionCreator(FETCH_MACHINE_CONTAINER_LIST, api.list);
export const createMachineContainer
  = apiActionCreator(CREATE_MACHINE_CONTAINER, api.create);

export const setShowAll = (showAll: boolean) => ({
  type: SET_SHOW_ALL_CONTAINERS,
  value: showAll
})
