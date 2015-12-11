import api from '../api/container-api';
import {
  FETCH_MACHINE_CONTAINER_LIST,
  CREATE_MACHINE_CONTAINER
} from '../constants/action-type';
import { apiActionCreator } from '../utils/action-utils';

export const fetchMachineContainerList
  = apiActionCreator(FETCH_MACHINE_CONTAINER_LIST, api.list);
export const createMachineContainer
  = apiActionCreator(CREATE_MACHINE_CONTAINER, api.create);
