import { combineReducers } from 'redux';
import ASYNC_STATUS from '../constants/async-status';
import * as ACTION_TYPES from '../constants/action-types';
import { AutoCompleteResult } from '../constants/interfaces';

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
  } else {
    return state
  }
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
  containersByMachineName,
  autoCompleteImagesByMachineName,
  showAll
})
