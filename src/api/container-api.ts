const request = require('superagent');
import { Response } from 'superagent';
import { apiBaseUrl, end, Options} from './shared'

function buildPath(machineName: string): string {
  return `${apiBaseUrl}/machines/${machineName}/containers`;
}

export default {
  list: function (machineName: string, options?: Options): Promise<Response> {
    return end(request.get(`${buildPath(machineName)}`).query(options));
  },
  inspect: function (machineName: string, containerId: string, options?: Options): Promise<Response> {
    return end(request.get(`${buildPath(machineName)}/${containerId}`).query(options));
  },
  create: function (machineName: string, options: Options): Promise<Response> {
    return end(request.post(`${buildPath(machineName)}`).send(options));
  },
  start: function (machineName: string, containerId: string, options?: Options): Promise<Response> {
    return end(request.post(`${buildPath(machineName)}/${containerId}/start`).send(options));
  },
  stop: function (machineName: string, containerId: string, options?: Options): Promise<Response> {
    return end(request.post(`${buildPath(machineName)}/${containerId}/stop`).send(options));
  },
  remove: function (machineName: string, containerId: string, options?: Options): Promise<Response> {
    return end(request.delete(`${buildPath(machineName)}/${containerId}`).send(options));
  }
}
