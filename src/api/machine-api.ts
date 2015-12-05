import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import Base from './base'

class MachineApi extends Base {

  list(): Promise<Response> {
    return this._exec(request.get(`${this.baseUrl}/machines`));
  }

  create(name, options): Promise<Response> {
    return this._exec(request.post(`${this.baseUrl}/machines/${name}`).send(options));
  }

  remove(name): Promise<Response> {
    return this._exec(request.del(`${this.baseUrl}/machines/${name}`));
  }

  start(name): Promise<Response> {
    return this._exec(request.post(`${this.baseUrl}/machines/${name}/start`));
  }

  stop(name): Promise<Response> {
    return this._exec(request.post(`${this.baseUrl}/machines/${name}/stop`));
  }

}

export default new MachineApi();
