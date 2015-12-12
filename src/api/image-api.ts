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
  }
}
