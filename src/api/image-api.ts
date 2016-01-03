import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import { apiBaseUrl, end, Options} from './shared'

function buildMachinePath(machineName: string): string {
  return `${apiBaseUrl}/machines/${machineName}/images`;
}

function buildLocalPath(): string {
  return `${apiBaseUrl}/local/images`;
}

export default {
  fetchMachineImageList: function (machineName: string, options?: Options): Promise<Response> {
    return end(request.get(`${buildMachinePath(machineName)}`).query(options));
  },
  createMachineImage: function (machineName: string, options?: Options): Promise<Response> {
    return end(request.post(`${buildMachinePath(machineName)}`).send(options));
  },
  removeMachineImage: function (machineName: string, imageName: string, options?: Options): Promise<Response> {
    return end(request.delete(`${buildMachinePath(machineName)}/${imageName}`).send(options));
  },

  //local docker
  fetchList: function (options?: Options) {
    return end(request.get(`${buildLocalPath()}`).query(options));
  },
  create: function (options?: Options) {
    return end(request.post(`${buildLocalPath()}`).send(options));
  },
  remove: function (imageName: string, options?: Options) {
    return end(request.delete(`${buildLocalPath()}/${imageName}`).send(options));
  }
}
