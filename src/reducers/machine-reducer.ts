import { combineReducers } from 'redux';
import ASYNC_STATUS from '../constants/async-status';
import * as ACTION_TYPE from '../constants/action-types';
import { AsyncAction } from '../constants/interfaces';

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

function createSingleValueByNameReducer(actionType: string) {
  return (state = [], action: AsyncAction) => {
    if (action.type === actionType && action.asyncStatus === ASYNC_STATUS.COMPLETED) {
      const name = action.args[0];
      return _.assign({}, state, {
        [name]: action.result.value
      })
    }
    return state;
  }
}

function fetchList(state = false, action: AsyncAction) {
  if (action.type === ACTION_TYPE.FETCH_MACHINE_LIST) {
    switch(action.asyncStatus) {
      case ASYNC_STATUS.START:
        return true
      case ASYNC_STATUS.ENDED:
        return false
    }
  }
  return state;
}

function machinesByName(state = {}, action: AsyncAction) {
  if (action.type === ACTION_TYPE.FETCH_MACHINE_LIST) {
    switch (action.asyncStatus) {
      case ASYNC_STATUS.COMPLETED:
        return _.indexBy(action.result, 'name');
    }
  } else if (action.type === ACTION_TYPE.CREATE_MACHINE) {
    const args = action.args;
    const name = args[0];
    const options = args[1];
    switch (action.asyncStatus) {
      case ASYNC_STATUS.START:
        return _.assign({}, state, {
          [name]: {
            name: name,
            active: false,
            state: 'Creating',
            driver: options.driver,
            swarm: '',
            url: ''
          }
        });
    }
  } else if (action.type === ACTION_TYPE.REMOVE_MACHINE) {
    const args = action.args;
    const name = args[0];
    switch (action.asyncStatus) {
      case ASYNC_STATUS.COMPLETED:
        const newState = _.assign({}, state);
        delete newState[name];
        return newState;
    }
  }

  return state;
};

export default combineReducers({
  machinesByName,
  statusesByName: createSingleValueByNameReducer(ACTION_TYPE.FETCH_MACHINE_STATUS),
  ipsByName: createSingleValueByNameReducer(ACTION_TYPE.FETCH_MACHINE_IP),
  operating: combineReducers({
    fetchList,
    create: createOperatingReducer(ACTION_TYPE.CREATE_MACHINE),
    remove: createOperatingReducer(ACTION_TYPE.REMOVE_MACHINE),
    start: createOperatingReducer(ACTION_TYPE.START_MACHINE),
    stop: createOperatingReducer(ACTION_TYPE.STOP_MACHINE)
  })
})
