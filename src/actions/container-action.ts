import * as Reflux from 'reflux';
import api from '../api/container-api';
import { asyncAction, bindPromiseApi } from './action';

export const ContainerActions = Reflux.createActions({
  'loadList': asyncAction(),
  'create': asyncAction()
});

bindPromiseApi(ContainerActions.loadList, api, 'list');
bindPromiseApi(ContainerActions.create, api, 'create');
