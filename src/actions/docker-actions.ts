import api from '../api/docker-api';
import { FETCH_DOCKER_INFO } from '../constants/action-types';
import { apiActionCreator } from '../utils/action-utils';

export const fetchDockerInfo = apiActionCreator(FETCH_DOCKER_INFO, api.info);
