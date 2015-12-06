import * as Reflux from 'reflux';
import api from '../api/machine-container-api';
import { apiChildrenActions, bindApi } from './api-action';

export const MachineContainerActions = Reflux.createActions({
  'loadList': apiChildrenActions
});

bindApi(MachineContainerActions.loadList, api, 'list');
