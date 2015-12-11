import { combineReducers } from 'redux';
import ASYNC_STATUS from '../constants/async-status';
import { FETCH_MACHINE_CONTAINER_LIST } from '../constants/action-type';

function containersByMachineName(state = {}, action) {
  if (action.type === FETCH_MACHINE_CONTAINER_LIST) {
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

export default combineReducers({
  containersByMachineName
})
