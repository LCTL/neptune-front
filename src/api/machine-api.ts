import * as request from 'superagent';
import * as Promise from 'bluebird';
import { Response } from 'superagent';
import Base from './base'

class MachineApi extends Base {

  list(): Promise<Response> {
    return this._exec(request.get(`${this.baseUrl}/machines`));
  }

  create(name, driver, swarm): Promise<Response> {
    return this._exec(request.post(`${this.baseUrl}/machines/${name}`).send({
      driver: driver,
      swarm: swarm
    }));
  }

}

export default new MachineApi();
