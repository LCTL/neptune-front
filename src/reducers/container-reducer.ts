import { combineReducers } from 'redux';
import ASYNC_STATUS from '../constants/async-status';
import { FETCH_MACHINE_CONTAINER_LIST, SET_SHOW_ALL_CONTAINERS } from '../constants/action-types';

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

function showAll(state = false, action) {
  switch(action.type) {
    case SET_SHOW_ALL_CONTAINERS:
      return action.value;
  }
  return state;
}

export default combineReducers({
  containersByMachineName,
  showAll
})
