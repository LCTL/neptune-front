import api from '../api/container-api';
import * as ACTION_TYPES from '../constants/action-types';
import { apiActionCreator } from '../utils/action-utils';

export const fetchMachineContainerList
  = apiActionCreator(ACTION_TYPES.FETCH_MACHINE_CONTAINER_LIST, api.list);
export const createMachineContainer
  = apiActionCreator(ACTION_TYPES.CREATE_MACHINE_CONTAINER, api.create);
export const startMachineContainer
  = apiActionCreator(ACTION_TYPES.START_MACHINE_CONTAINER, api.start);
export const stopMachineContainer
  = apiActionCreator(ACTION_TYPES.STOP_MACHINE_CONTAINER, api.stop);
export const removeMachineContainer
  = apiActionCreator(ACTION_TYPES.REMOVE_MACHINE_CONTAINER, api.remove);
export const inspectMachineContainer
  = apiActionCreator(ACTION_TYPES.INSPECT_MACHINE_CONTAINER, api.inspect);
export const fetchMachineContainerLogs
  = apiActionCreator(ACTION_TYPES.FETCH_MACHINE_CONTAINER_LOGS, api.logs);

export const setShowAll = (showAll: boolean) => ({
  type: ACTION_TYPES.SET_SHOW_ALL_CONTAINERS,
  value: showAll
})
