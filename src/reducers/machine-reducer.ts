import { combineReducers } from 'redux';
import ASYNC_STATUS from '../constants/async-status';
import * as ACTION_TYPE from '../constants/action-type';
import { AsyncAction } from '../actions/action';

function createOperatingReducer(actionType: string) {
  return (state = [], action: AsyncAction) => {
    if (action.type === actionType) {
      const name = action.args[0];
      switch (action.asyncStatus) {
        case ASYNC_STATUS.START:
          return state.concat([name]);
        case ASYNC_STATUS.ENDED:
          return state.filter(n => n !== name);
        default:
          return state;
      }
    } else {
      return state;
    }
  }
}

export function machines(state = [], action: AsyncAction) {
  if (action.type === ACTION_TYPE.FETCH_MACHINE_LIST) {
    switch (action.asyncStatus) {
      case ASYNC_STATUS.COMPLETED:
        return action.result;
      default:
        return state;
    }
  } else if (action.type === ACTION_TYPE.CREATE_MACHINE) {
    const args = action.args;
    const name = args[0];
    const options = args[1];
    switch (action.asyncStatus) {
      case ASYNC_STATUS.START:
        return state.concat([{
          name: name,
          active: false,
          state: 'Creating',
          driver: options.driver,
          swarm: '',
          url: ''
        }])
      default:
        return state;
    }
  } else {
    return state;
  }
};

export function machineStatusesByName(state = {}, action: AsyncAction) {
  if (action.type === ACTION_TYPE.FETCH_MACHINE_STATUS) {
    const name = action.args[0];
    switch (action.asyncStatus) {
      case ASYNC_STATUS.COMPLETED:
        return _.assign({}, state, {
          [name]: action.result.value
        })
      default:
        return state;
    }
  } else {
    return state;
  }
}

export const machineOperating = combineReducers({
  create: createOperatingReducer(ACTION_TYPE.CREATE_MACHINE),
  remove: createOperatingReducer(ACTION_TYPE.REMOVE_MACHINE),
  start: createOperatingReducer(ACTION_TYPE.START_MACHINE),
  stop: createOperatingReducer(ACTION_TYPE.STOP_MACHINE)
});
