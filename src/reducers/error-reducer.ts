import { combineReducers } from 'redux';
import { AsyncErrorWrapper } from '../constants/interfaces';
import ASYNC_STATUS from '../constants/async-status';
import { AsyncAction } from '../constants/interfaces';

function asyncErrors (state = [], action:AsyncAction) {
  switch (action.asyncStatus) {
    case ASYNC_STATUS.FAILED:
      const wrapper:AsyncErrorWrapper = {
        timestamp: Date.now(),
        error: action.err.response.body.error
      }
      return state.slice().concat([wrapper]);
  }
  return state;
}

export default combineReducers({
  asyncErrors
})
