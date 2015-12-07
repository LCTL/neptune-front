import * as Reflux from 'reflux';
import api from '../api/docker-api';
import { asyncAction, bindPromiseApi } from './action';

export const DockerActions = Reflux.createActions({
  'loadInfo': asyncAction
});

bindPromiseApi(DockerActions.loadInfo, api, 'info');
