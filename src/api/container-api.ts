import * as request from 'superagent';
import { Response } from 'superagent';
import { Api, Options} from './api'

class ContainerApi extends Api {

  list(machineName: string, options: Options): Promise<Response> {
    return this._exec(request.get(`${this._buildPath(machineName)}`).query(options));
  }

  create(machineName: string, options: Options): Promise<Response> {
    return this._exec(request.post(`${this._buildPath(machineName)}`).send(options));
  }

  protected _buildPath(machineName: string): string {
    return `${this.baseUrl}/machines/${machineName}/containers`;
  }

}

export default new ContainerApi();
