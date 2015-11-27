import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import Base from './base'

class MachineApi extends Base {
  list(): Promise<Response> {
    return this._exec(request.get('/api/machines'));
  }
}

export default new MachineApi();
