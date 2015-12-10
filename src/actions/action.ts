export const asyncAction = function() {
  return {
    asyncResult: true,
    children: ['start', 'end']
  }
};

export function bindPromiseApi(action, api, apiMethodName) {
  action.listen(function() {
    const args = Array.prototype.slice.call(arguments);
    this.start.apply(this, args);
    api[apiMethodName].apply(api, args)
      .then(_.partialRight(this.completed, ...args))
      .catch(_.partialRight(this.failed, ...args))
      .finally(() => this.end.apply(this, args));
  })
}

export function bindObjectMethod(action, obj, methodName) {
  action.listen(function() {
    obj[methodName].apply(obj, arguments);
  });
}

//----
import ASYNC_STATUS from '../constants/async-status';
import { Api } from '../api/Api';

export interface AsyncAction {
  type: string,
  asyncStatus: string,
  id: string,
  args: any[],
  result?: any,
  err?: any
}

export function apiActionCreator(action:string, api:Api, apiMethodName: string) {
  return function(...args: any[]) {
    const id = Date.now().toString();
    return function(dispatch) {
      dispatch({
        type: action,
        asyncStatus: ASYNC_STATUS.START,
        id,
        args,
      })
      api[apiMethodName].apply(api, args)
        .then(res => res.body)
        .then(result => dispatch({
          type: action,
          asyncStatus: ASYNC_STATUS.COMPLETED,
          id,
          args,
          result
        }))
        .catch(err => dispatch({
          type: action,
          asyncStatus: ASYNC_STATUS.FAILED,
          id,
          args,
          err
        }))
        .finally(() => dispatch({
          type: action,
          asyncStatus: ASYNC_STATUS.ENDED,
          id,
          args
        }));
    }
  }
}
