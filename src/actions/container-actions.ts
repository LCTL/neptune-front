import api from '../api/container-api';
import * as ACTION_TYPES from '../constants/action-types';
import { apiActionCreator } from '../utils/action-utils';

export const fetchMachineContainerList
  = apiActionCreator(ACTION_TYPES.FETCH_MACHINE_CONTAINER_LIST, api.fetchMachineContainerList);
export const createMachineContainer
  = apiActionCreator(ACTION_TYPES.CREATE_MACHINE_CONTAINER, api.createMachineContainer);
export const startMachineContainer
  = apiActionCreator(ACTION_TYPES.START_MACHINE_CONTAINER, api.startMachineContainer);
export const stopMachineContainer
  = apiActionCreator(ACTION_TYPES.STOP_MACHINE_CONTAINER, api.stopMachineContainer);
export const removeMachineContainer
  = apiActionCreator(ACTION_TYPES.REMOVE_MACHINE_CONTAINER, api.removeMachineContainer);
export const inspectMachineContainer
  = apiActionCreator(ACTION_TYPES.INSPECT_MACHINE_CONTAINER, api.inspectMachineContainer);
export const fetchMachineContainerLogs
  = apiActionCreator(ACTION_TYPES.FETCH_MACHINE_CONTAINER_LOGS, api.fetchMachineContainerLogs);
export const pauseMachineContainer
  = apiActionCreator(ACTION_TYPES.PAUSE_MACHINE_CONTAINER, api.pauseMachineContainer);
export const unpauseMachineContainer
  = apiActionCreator(ACTION_TYPES.UNPAUSE_MACHINE_CONTAINER, api.unpauseMachineContainer);

export const fetchContainerList
  = apiActionCreator(ACTION_TYPES.FETCH_CONTAINER_LIST, api.fetchList);
export const createContainer
  = apiActionCreator(ACTION_TYPES.CREATE_CONTAINER, api.create);
export const startContainer
  = apiActionCreator(ACTION_TYPES.START_CONTAINER, api.start);
export const stopContainer
  = apiActionCreator(ACTION_TYPES.STOP_CONTAINER, api.stop);
export const removeContainer
  = apiActionCreator(ACTION_TYPES.REMOVE_CONTAINER, api.remove);
export const inspectContainer
  = apiActionCreator(ACTION_TYPES.INSPECT_CONTAINER, api.inspect);
export const fetchContainerLogs
  = apiActionCreator(ACTION_TYPES.FETCH_CONTAINER_LOGS, api.fetchLogs);
export const pauseContainer
  = apiActionCreator(ACTION_TYPES.PAUSE_CONTAINER, api.pause);
export const unpauseContainer
  = apiActionCreator(ACTION_TYPES.UNPAUSE_CONTAINER, api.unpause);

export const setShowAll = (showAll: boolean) => ({
  type: ACTION_TYPES.SET_SHOW_ALL_CONTAINERS,
  value: showAll
})
