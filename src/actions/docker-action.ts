import * as Reflux from 'reflux';
import api from '../api/docker-api';
import { asyncAction, bindPromiseApi } from './action';

export const DockerActions = Reflux.createActions({
  'loadInfo': asyncAction()
});

bindPromiseApi(DockerActions.loadInfo, api, 'info');

//----
import { FETCH_DOCKER_INFO } from '../constants/action-type';
import { apiActionCreator } from './action';

export const fetchDockerInfo = apiActionCreator(FETCH_DOCKER_INFO, api, 'info');
