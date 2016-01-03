const request = require('superagent');
import { Response } from 'superagent';
import { apiBaseUrl, end, stream, Options} from './shared'

function buildMachinePath(machineName: string): string {
  return `${apiBaseUrl}/machines/${machineName}/containers`;
}

function buildLocalPath(): string {
  return `${apiBaseUrl}/local/containers`;
}

export default {
  fetchMachineContainerList: function (machineName: string, options?: Options): Promise<Response> {
    return end(request.get(`${buildMachinePath(machineName)}`).query(options));
  },
  inspectMachineContainer: function (machineName: string, containerId: string, options?: Options): Promise<Response> {
    return end(request.get(`${buildMachinePath(machineName)}/${containerId}`).query(options));
  },
  fetchMachineContainerLogs: function (machineName: string, containerId: string, options?: Options) {
    return stream(request.get(`${buildMachinePath(machineName)}/${containerId}/logs`).query(options));
  },
  createMachineContainer: function (machineName: string, options: Options): Promise<Response> {
    return end(request.post(`${buildMachinePath(machineName)}`).send(options));
  },
  startMachineContainer: function (machineName: string, containerId: string, options?: Options): Promise<Response> {
    return end(request.post(`${buildMachinePath(machineName)}/${containerId}/start`).send(options));
  },
  stopMachineContainer: function (machineName: string, containerId: string, options?: Options): Promise<Response> {
    return end(request.post(`${buildMachinePath(machineName)}/${containerId}/stop`).send(options));
  },
  removeMachineContainer: function (machineName: string, containerId: string, options?: Options): Promise<Response> {
    return end(request.delete(`${buildMachinePath(machineName)}/${containerId}`).send(options));
  },
  pauseMachineContainer: function (machineName: string, containerId: string, options?: Options) {
    return end(request.post(`${buildMachinePath(machineName)}/${containerId}/pause`).send(options));
  },
  unpauseMachineContainer: function (machineName: string, containerId: string, options?: Options) {
    return end(request.post(`${buildMachinePath(machineName)}/${containerId}/unpause`).send(options));
  },

  //Local docker
  fetchList: function (options?: Options) {
    return end(request.get(`${buildLocalPath()}`).query(options));
  },
  inspect: function (containerId: string, options?: Options) {
    return end(request.get(`${buildLocalPath()}/${containerId}`).query(options));
  },
  fetchLogs: function (containerId: string, options?: Options) {
    return stream(request.get(`${buildLocalPath()}/${containerId}/logs`).query(options));
  },
  create: function (options: Options) {
    return end(request.post(`${buildLocalPath()}`).send(options));
  },
  start: function (containerId: string, options?: Options) {
    return end(request.post(`${buildLocalPath()}/${containerId}/start`).send(options));
  },
  stop: function (containerId: string, options?: Options) {
    return end(request.post(`${buildLocalPath()}/${containerId}/stop`).send(options));
  },
  remove: function (containerId: string, options?: Options) {
    return end(request.delete(`${buildLocalPath()}/${containerId}`).send(options));
  },
  pause: function (containerId: string, options?: Options) {
    return end(request.post(`${buildLocalPath()}/${containerId}/pause`).send(options));
  },
  unpause: function (containerId: string, options?: Options) {
    return end(request.post(`${buildLocalPath()}/${containerId}/unpause`).send(options));
  }
}
