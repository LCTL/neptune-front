import * as Reflux from 'reflux';
import api from '../api/docker-api';
import { apiChildrenActions, bindApi } from './api-action';

export const MachineActions = Reflux.createActions({
  'loadInfo': apiChildrenActions
});

bindApi(MachineActions.load, api, 'info');
