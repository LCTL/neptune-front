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

export interface PathInfo {
  path: RegExp,
  label?: string
  dynamicLabel?: (params: any) => string
}

export interface AutoCompleteResult {
  title: string,
  description: string
}
