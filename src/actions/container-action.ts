import * as Reflux from 'reflux';
import api from '../api/machine-container-api';
import { apiChildrenActions, bindApi } from './api-action';

export const ContainerActions = Reflux.createActions({
  'loadList': apiChildrenActions,
  'create': apiChildrenActions
});

bindApi(ContainerActions.loadList, api, 'list');
bindApi(ContainerActions.create, api, 'create');
