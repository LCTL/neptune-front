import * as request from 'superagent';
import { Response } from 'superagent';
import { Api, Options} from './api'

class MachineContainerApi extends Api {

  list(machineName: string, options: Options): Promise<Response> {
    return this._exec(request.get(`${this._buildPath(machineName)}`).query(options));
  }

  protected _buildPath(machineName: string): string {
    return `${this.baseUrl}/machines/${machineName}/containers`;
  }

}

export default new MachineContainerApi();