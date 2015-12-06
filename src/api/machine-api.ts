import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import { Api, Options} from './api'

class MachineApi extends Api {

  list(options: Options): Promise<Response> {
    return this._exec(request.get(`${this.baseUrl}/machines`).query(options));
  }

  create(name: string, options: Options): Promise<Response> {
    return this._exec(request.post(`${this._buildPath(name)}`).send(options));
  }

  remove(name: string, options: Options): Promise<Response> {
    return this._exec(request.del(`${this._buildPath(name)}`).send(options));
  }

  start(name: string, options: Options): Promise<Response> {
    return this._exec(request.post(`${this._buildPath(name)}/start`).send(options));
  }

  stop(name: string, options: Options): Promise<Response> {
    return this._exec(request.post(`${this._buildPath(name)}/stop`).send(options));
  }

  status(name: string, options: Options): Promise<Response> {
    return this._exec(request.get(`${this._buildPath(name)}/status`).send(options));
  }

  inspect(name: string, options: Options): Promise<Response> {
    return this._exec(request.get(`${this._buildPath(name)}`).send(options));
  }

  protected _buildPath(name: string): string {
    return `${this.baseUrl}/machines/${name}`;
  }

}

export default new MachineApi();
