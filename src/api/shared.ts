import * as Promise from 'bluebird';
import { Request, Response } from 'superagent';

const R = require('superagent').Request
const _end = Promise.promisify(R.prototype.end);

export const apiBaseUrl = '/api';

export interface Options {
  [name: string]: string;
}

export function end(request: Request<any>): Promise<Response> {
  return _end.apply(request);
}
