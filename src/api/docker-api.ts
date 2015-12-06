import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import { Api, Options} from './api'

class DockerApi extends Api {

  info(machineName: string): Promise<Response> {
    return this._exec(request.get(`${this._buildPath(machineName)}`));
  }

  protected _buildPath(machineName: string): string {
    return `${this.baseUrl}/machines/${machineName}/docker`;
  }

}

export default new DockerApi();
