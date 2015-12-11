import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import { apiBaseUrl, end, Options} from './shared'

function buildPath(machineName: string): string {
  return `${apiBaseUrl}/machines/${machineName}/docker`;
}

export default {
  info: function(machineName: string): Promise<Response> {
    return end(request.get(`${buildPath(machineName)}`));
  }
}
