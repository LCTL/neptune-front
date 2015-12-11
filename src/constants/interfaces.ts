import { Response } from 'superagent';

export interface API {
  (...args): Promise<Response>
}

export interface AsyncAction {
  type: string,
  asyncStatus: string,
  id: string,
  args: any[],
  result?: any,
  err?: any
}
