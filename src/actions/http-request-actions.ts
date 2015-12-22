import { ABORT_HTTP_REQUEST, ABORT_HTTP_REQUEST_COMPLETE } from '../constants/action-types'

export const abort = (id: string) => (dispatch) => dispatch({
  type: ABORT_HTTP_REQUEST,
  id: id
});

export const abortComplete = (id: string) => (dispatch) => dispatch({
  type: ABORT_HTTP_REQUEST_COMPLETE,
  id: id
});
