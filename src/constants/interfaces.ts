import { Request, Response } from 'superagent';

export interface ApiStreamResponse {
  promise: Promise<Response>,
  request: Request<any>,
  onprogress?: (data) => void
}

export interface API {
  (...args): Promise<Response> | ApiStreamResponse
}

export interface AsyncAction {
  type: string,
  asyncStatus: string,
  id: string,
  args: any[],
  result?: any,
  err?: any,
  progressData?: any,
  request?: Request<any>
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

export interface AsyncError {
  message: string,
  status: number
}

export interface AsyncErrorWrapper {
  timestamp: number,
  error: AsyncError
}
