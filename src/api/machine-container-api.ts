import * as request from 'superagent';
import { Response } from 'superagent';
import { Api, Options} from './api'

class MachineContainerApi extends Api {

  list(machineName: string): Promise<Response> {
    return this._exec(request.get(`${this._buildPath(machineName)}`));
  }

  protected _buildPath(machineName: string): string {
    return `${this.baseUrl}/machines/${machineName}/containers`;
  }

}

export default new MachineContainerApi();
