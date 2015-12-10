import * as Reflux from 'reflux';
import api from '../api/machine-api';
import { asyncAction, bindPromiseApi } from './action';

export const MachineActions = Reflux.createActions({
  'load': asyncAction(),
  'create': asyncAction(),
  'remove': asyncAction(),
  'start': asyncAction(),
  'stop': asyncAction(),
  'loadStatus': asyncAction(),
  'inspect': asyncAction(),
});

bindPromiseApi(MachineActions.load, api, 'list');
bindPromiseApi(MachineActions.create, api, 'create');
bindPromiseApi(MachineActions.remove, api, 'remove');
bindPromiseApi(MachineActions.start, api, 'start');
bindPromiseApi(MachineActions.stop, api, 'stop');
bindPromiseApi(MachineActions.loadStatus, api, 'status');
bindPromiseApi(MachineActions.inspect, api, 'inspect');

//----

import {
  FETCH_MACHINE_LIST,
  FETCH_MACHINE_STATUS,
  CREATE_MACHINE,
  REMOVE_MACHINE,
  START_MACHINE,
  STOP_MACHINE
} from '../constants/action-type';
import { apiActionCreator } from './action';

export const fetchList = apiActionCreator(FETCH_MACHINE_LIST, api, 'list');
export const fetchStatus = apiActionCreator(FETCH_MACHINE_STATUS, api, 'status');
export const create = apiActionCreator(CREATE_MACHINE, api, 'create');
export const remove = apiActionCreator(REMOVE_MACHINE, api, 'remove');
export const start = apiActionCreator(START_MACHINE, api, 'start');
export const stop = apiActionCreator(STOP_MACHINE, api, 'stop');
