import { combineReducers } from 'redux';
import ASYNC_STATUS from '../constants/async-status';
import { FETCH_DOCKER_INFO } from '../constants/action-type';

function infosByName(state = {}, action) {
  if (action.type === FETCH_DOCKER_INFO) {
    const machineName = action.args[0];
    switch (action.asyncStatus) {
      case ASYNC_STATUS.COMPLETED:
        return _.assign({}, state, {
          [machineName]: action.result
        });
      default:
        return state;
    }
  } else {
    return state
  }
}

export const docker = combineReducers({
  infosByName
})
