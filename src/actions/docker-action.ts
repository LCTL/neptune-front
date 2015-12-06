import * as Reflux from 'reflux';
import api from '../api/docker-api';
import { apiChildrenActions, bindApi } from './api-action';

export const DockerActions = Reflux.createActions({
  'loadInfo': apiChildrenActions
});

bindApi(DockerActions.loadInfo, api, 'info');
