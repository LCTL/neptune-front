import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import { apiBaseUrl, end, Options} from './shared'

function buildPath(name: string): string {
  return `${apiBaseUrl}/machines/${name}`;
}

export default {
  list: function (options: Options): Promise<Response> {
    return end(request.get(`${apiBaseUrl}/machines`).query(options));
  },
  create: function(name: string, options: Options): Promise<Response> {
    return end(request.post(`${buildPath(name)}`).send(options));
  },
  remove: function(name: string, options: Options): Promise<Response> {
    return end(request.del(`${buildPath(name)}`).send(options));
  },
  start: function(name: string, options: Options): Promise<Response> {
    return end(request.post(`${buildPath(name)}/start`).send(options));
  },
  stop: function(name: string, options: Options): Promise<Response> {
    return end(request.post(`${buildPath(name)}/stop`).send(options));
  },
  status: function(name: string, options: Options): Promise<Response> {
    return end(request.get(`${buildPath(name)}/status`).send(options));
  },
  inspect: function(name: string, options: Options): Promise<Response> {
    return end(request.get(`${buildPath(name)}`).send(options));
  },
  fetchIp: function(name: string, options?: Options): Promise<Response> {
    return end(request.get(`${buildPath(name)}/ip`).query(options));
  }
}
