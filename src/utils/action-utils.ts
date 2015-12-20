import ASYNC_STATUS from '../constants/async-status';
import { API } from '../constants/interfaces';

export function apiActionCreator(actionType:string, api: API) {
  return function(...args) {
    const id = Date.now().toString();
    return function(dispatch) {
      dispatch({
        type: actionType,
        asyncStatus: ASYNC_STATUS.START,
        id,
        args,
      })
      const response:any = api(...args)
      const promise = response.promise || response;

      promise.then(res => res.body)
        .then(result => dispatch({
          type: actionType,
          asyncStatus: ASYNC_STATUS.COMPLETED,
          id,
          args,
          result
        }))
        .catch(err => dispatch({
          type: actionType,
          asyncStatus: ASYNC_STATUS.FAILED,
          id,
          args,
          err
        }))
        .finally(() => dispatch({
          type: actionType,
          asyncStatus: ASYNC_STATUS.ENDED,
          id,
          args
        }));

      if (response.promise) {
        response.onprogress = (progressData) => dispatch({
          type: actionType,
          asyncStatus: ASYNC_STATUS.PROGRESS,
          progressData,
          id,
          args
        })
      }

    }
  }
}
