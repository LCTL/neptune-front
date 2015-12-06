import * as Promise from 'bluebird';
import { Request, Response } from 'superagent';

const R = require('superagent').Request
const end = Promise.promisify(R.prototype.end);

export interface Options {
  [name: string]: string;
}

export class Api {
  baseUrl: string = '/api';
  protected _exec(request: Request<any>): Promise<Response> {
    return end.apply(request);
  }
}
