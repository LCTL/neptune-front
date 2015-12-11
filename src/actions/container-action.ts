import * as Reflux from 'reflux';
import api from '../api/container-api';
import { asyncAction, bindPromiseApi } from './action';

export const ContainerActions = Reflux.createActions({
  'loadList': asyncAction(),
  'create': asyncAction()
});

bindPromiseApi(ContainerActions.loadList, api, 'list');
bindPromiseApi(ContainerActions.create, api, 'create');

//----
import {
  FETCH_MACHINE_CONTAINER_LIST,
  CREATE_MACHINE_CONTAINER
} from '../constants/action-type';
import { apiActionCreator } from './action';

export const fetchMachineContainerList
  = apiActionCreator(FETCH_MACHINE_CONTAINER_LIST, api, 'list');
export const createMachineContainer
  = apiActionCreator(CREATE_MACHINE_CONTAINER, api, 'create');
