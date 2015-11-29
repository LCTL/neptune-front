import * as Promise from 'bluebird';
import { Request, Response } from 'superagent';

const R = require('superagent').Request
const end = Promise.promisify(R.prototype.end);

export default class Base {
  baseUrl: string = '/api';
  protected _exec(request: Request<any>): Promise<Response> {
    return end.apply(request);
  }
}
