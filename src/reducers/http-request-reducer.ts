import * as _ from 'lodash';
import { combineReducers } from 'redux';
import ASYNC_STATUS from '../constants/async-status';
import * as ACTION_TYPES from '../constants/action-types';
import { AsyncAction } from '../constants/interfaces';

function requestsById(state = {}, action: AsyncAction) {
  const requestId = action.id;
  switch (action.asyncStatus) {
    case ASYNC_STATUS.PROGRESS:
      return _.assign({}, state, {
        [requestId]: action.request
      });
    case ASYNC_STATUS.ENDED:
      return _.omit(state, (value, key) => key === requestId);
  }
  return state;
}

function requestIdsForAbort(state = [], action) {
  switch (action.type) {
    case ACTION_TYPES.ABORT_HTTP_REQUEST:
      return state.concat([action.id]);
    case ACTION_TYPES.ABORT_HTTP_REQUEST_COMPLETE:
      return state.filter(id => id !== action.id);
  }
  return state;
}

export default combineReducers({
  requestsById,
  requestIdsForAbort
})
