import * as Promise from 'bluebird';
import { Request, Response } from 'superagent';
import { ApiStreamResponse } from '../constants/interfaces';

const R = require('superagent').Request
const _end = Promise.promisify(R.prototype.end);

export const apiBaseUrl = '/api';

export interface Options {
  [name: string]: string;
}

export function end(request: Request<any>): Promise<Response> {
  return _end.apply(request);
}

export function stream(request: Request<any>): ApiStreamResponse {
  let response: ApiStreamResponse;
  request.on('progress', e => {
    if (response.onprogress) {
      const xhr = e.target;
      let text = xhr.responseText;
      if (text) {
        response.onprogress(text);
      }
    }
  });
  response = {
    promise: _end.apply(request)
  };
  return response;
}
