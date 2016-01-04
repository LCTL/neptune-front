import api from '../api/machine-api';
import {
  FETCH_MACHINE_LIST,
  FETCH_MACHINE_STATUS,
  CREATE_MACHINE,
  REMOVE_MACHINE,
  START_MACHINE,
  STOP_MACHINE,
  FETCH_MACHINE_IP,
  REGENERATE_MACHINE_CERTS
} from '../constants/action-types';
import { apiActionCreator } from '../utils/action-utils';

export const fetchList = apiActionCreator(FETCH_MACHINE_LIST, api.list);
export const fetchStatus = apiActionCreator(FETCH_MACHINE_STATUS, api.status);
export const create = apiActionCreator(CREATE_MACHINE, api.create);
export const remove = apiActionCreator(REMOVE_MACHINE, api.remove);
export const start = apiActionCreator(START_MACHINE, api.start);
export const stop = apiActionCreator(STOP_MACHINE, api.stop);
export const fetchIp = apiActionCreator(FETCH_MACHINE_IP, api.fetchIp);
export const regenerateCerts = apiActionCreator(REGENERATE_MACHINE_CERTS, api.regenerateCerts);
