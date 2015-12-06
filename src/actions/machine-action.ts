import * as Reflux from 'reflux';
import api from '../api/machine-api';
import { apiChildrenActions, bindApi } from './api-action';

export const MachineActions = Reflux.createActions({
  'load': apiChildrenActions,
  'create': apiChildrenActions,
  'remove': apiChildrenActions,
  'start': apiChildrenActions,
  'stop': apiChildrenActions,
  'loadStatus': apiChildrenActions,
  'inspect': apiChildrenActions,
});

bindApi(MachineActions.load, api, 'list');
bindApi(MachineActions.create, api, 'create');
bindApi(MachineActions.remove, api, 'remove');
bindApi(MachineActions.start, api, 'start');
bindApi(MachineActions.stop, api, 'stop');
bindApi(MachineActions.loadStatus, api, 'status');
bindApi(MachineActions.inspect, api, 'inspect');
