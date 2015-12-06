import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import { Api, Options} from './api'

class MachineApi extends Api {

  list(options: Options): Promise<Response> {
    return this._exec(request.get(`${this.baseUrl}/machines`).query(options));
  }

  create(name: string, options: Options): Promise<Response> {
    return this._exec(request.post(`${this.baseUrl}/machines/${name}`).send(options));
  }

  remove(name: string, options: Options): Promise<Response> {
    return this._exec(request.del(`${this.baseUrl}/machines/${name}`).send(options));
  }

  start(name: string, options: Options): Promise<Response> {
    return this._exec(request.post(`${this.baseUrl}/machines/${name}/start`).send(options));
  }

  stop(name: string, options: Options): Promise<Response> {
    return this._exec(request.post(`${this.baseUrl}/machines/${name}/stop`).send(options));
  }

}

export default new MachineApi();
