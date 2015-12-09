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

import ASYNC_STATUS from '../constants/async-status';
import { FETCH_MACHINE_LIST } from '../constants/action-type';
import { async } from './action';

export const fetchList = async(FETCH_MACHINE_LIST, api, 'list');
