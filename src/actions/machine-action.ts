import * as Reflux from 'reflux';
import { apiChildrenActions, bindApi } from './api-action';

export const MachineActions = Reflux.createActions({
  'load': apiChildrenActions,
  'create': apiChildrenActions,
  'remove': apiChildrenActions,
  'start': apiChildrenActions,
  'stop': apiChildrenActions
});

bindApi(MachineActions.load, 'list');
bindApi(MachineActions.create, 'create');
bindApi(MachineActions.remove, 'remove');
bindApi(MachineActions.start, 'start');
bindApi(MachineActions.stop, 'stop');
