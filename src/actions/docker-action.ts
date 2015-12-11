import api from '../api/docker-api';
import { FETCH_DOCKER_INFO } from '../constants/action-type';
import { apiActionCreator } from './action';

export const fetchDockerInfo = apiActionCreator(FETCH_DOCKER_INFO, api, 'info');
