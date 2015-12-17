import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import { apiBaseUrl, end, Options} from './shared'

function buildPath(machineName: string): string {
  return `${apiBaseUrl}/machines/${machineName}/images`;
}

export default {
  fetchMachineImageList: function (machineName: string, options?: Options): Promise<Response> {
    return end(request.get(`${buildPath(machineName)}`).query(options));
  },
  createMachineImage: function (machineName: string, options?: Options): Promise<Response> {
    return end(request.post(`${buildPath(machineName)}`).send(options));
  },
  removeMachineImage: function (machineName: string, imageName: string, options?: Options): Promise<Response> {
    return end(request.delete(`${buildPath(machineName)}/${imageName}`).send(options));
  }
}
