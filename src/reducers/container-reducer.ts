import { combineReducers } from 'redux';
import ASYNC_STATUS from '../constants/async-status';
import * as ACTION_TYPES from '../constants/action-types';
import { AutoCompleteResult, AsyncAction } from '../constants/interfaces';

function createOperatingReducer(actionType: string) {
  return (state = [], action: AsyncAction) => {
    if (action.type === actionType) {
      let id = action.args[1];
      switch (action.asyncStatus) {
        case ASYNC_STATUS.START:
          if (!_.isString(id)) {
            id = Date.now().toString();
            action.args.push(id);
          }
          return state.concat([id]);
        case ASYNC_STATUS.ENDED:
          if (!_.isString(id)) {
            id = _.last(action.args);
          }
          return state.filter(n => n !== id);
      }
    }
    return state;
  }
}

const operations = {
  create: createOperatingReducer(ACTION_TYPES.CREATE_MACHINE_CONTAINER),
  start: createOperatingReducer(ACTION_TYPES.START_MACHINE_CONTAINER),
  stop: createOperatingReducer(ACTION_TYPES.STOP_MACHINE_CONTAINER),
  remove: createOperatingReducer(ACTION_TYPES.REMOVE_MACHINE_CONTAINER)
}

function operatingByMachineName(state = {}, action) {
  if (action.asyncStatus) {
    const machineName = action.args[0];
    const operating:any = _.assign({}, state[machineName] || {});
    _.keys(operations).forEach(key => operating[key] = operations[key](operating[key], action))
    return _.assign({}, state, {
      [machineName]: operating
    });
  }
  return state;
}

function containersByMachineName(state = {}, action) {
  if (action.type === ACTION_TYPES.FETCH_MACHINE_CONTAINER_LIST) {
    const machineName = action.args[0];
    switch (action.asyncStatus) {
      case ASYNC_STATUS.COMPLETED:
        return _.assign({}, state, {
          [machineName]: action.result
        });
      default:
        return state;
    }
  } else if (action.type === ACTION_TYPES.CREATE_MACHINE_CONTAINER) {
    switch (action.asyncStatus) {
      case ASYNC_STATUS.START:
        const machineName = action.args[0];
        const options = action.args[1];
        let containers = state[machineName] || [];
        containers = containers.slice();
        containers.unshift({
          Id: Date.now().toString(),
          Names: ['/' + options.name || '/'],
          Command: options.Cmd,
          Image: options.Image,
          Status: 'Creating'
        });
        return _.assign({}, state, {
          [machineName]: containers
        });
    }
  }
  return state
}

function autoCompleteImagesByMachineName(state = {}, action) {
  if (action.type === ACTION_TYPES.FETCH_MACHINE_IMAGE_LIST) {
    switch (action.asyncStatus) {
      case ASYNC_STATUS.COMPLETED:
        const machineName = action.args[0];
        const images: AutoCompleteResult[] = [];
        action.result.forEach((image) => {
          image.RepoTags.forEach((repoTag) => {
            if (!/none/.test(image.repoTag)) {
              images.push({
                title: repoTag,
                description: ''
              });
            }
          })
        });
        return _.assign({}, state, {
          [machineName]: images
        });
    }
  }
  return state
}

function showAll(state = false, action) {
  switch(action.type) {
    case ACTION_TYPES.SET_SHOW_ALL_CONTAINERS:
      return action.value;
  }
  return state;
}

export default combineReducers({
  operatingByMachineName,
  containersByMachineName,
  autoCompleteImagesByMachineName,
  showAll
})
