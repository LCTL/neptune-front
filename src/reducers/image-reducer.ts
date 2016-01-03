import { combineReducers } from 'redux';
import ASYNC_STATUS from '../constants/async-status';
import * as ACTION_TYPES from '../constants/action-types';
import { AsyncAction } from '../constants/interfaces';

function createImageTemp(options) {
  const nameTag = `${options.fromImage}${options.tag ? ':' + options.tag : ''}`;
  return {
    Created: Date.now(),
    RepoTags: [nameTag],
    Size: 0,
    VirtualSize: 0,
    status: 'Pulling'
  }
}

function imagesByMachineName(state = {}, action) {
  if (action.type === ACTION_TYPES.FETCH_MACHINE_IMAGE_LIST) {
    const machineName = action.args[0];
    switch (action.asyncStatus) {
      case ASYNC_STATUS.COMPLETED:
        return _.assign({}, state, {
          [machineName]: action.result
        });
    }
  } else if (action.type === ACTION_TYPES.PULL_MACHINE_IMAGE
      && action.asyncStatus === ASYNC_STATUS.START) {
      const machineName = action.args[0];
      const options = action.args[1];
      let images = state[machineName] || [];
      images = images.slice();
      images.unshift(createImageTemp(options))
      return _.assign({}, state, {
        [machineName]: images
      });
  }

  return state
}

function createOperatingReducer(actionType: string, nameIndex: number = 1) {
  return (state = [], action: AsyncAction) => {
    if (action.type === actionType) {
      let nameTag = action.args[nameIndex];
      if (_.isObject(nameTag)) {
        let options = nameTag;
        nameTag = `${options.fromImage}${options.tag ? ':' + options.tag : ''}`;
      }
      switch (action.asyncStatus) {
        case ASYNC_STATUS.START:
          return state.concat([nameTag]);
        case ASYNC_STATUS.ENDED:
          return state.filter(n => n !== nameTag);
      }
    }
    return state;
  }
}

const operations = {
  pull: createOperatingReducer(ACTION_TYPES.PULL_MACHINE_IMAGE),
  remove: createOperatingReducer(ACTION_TYPES.REMOVE_MACHINE_IMAGE)
}

const localOperations = {
  pull: createOperatingReducer(ACTION_TYPES.PULL_IMAGE, 0),
  remove: createOperatingReducer(ACTION_TYPES.REMOVE_IMAGE, 0)
}

const pull = createOperatingReducer(ACTION_TYPES.PULL_MACHINE_IMAGE);

function operatingByMachineName(state = {}, action) {
  if (action.asyncStatus) {
    const machineName = action.args[0];
    const operating:any = _.assign({}, state[machineName] || {});
    _.keys(operations).forEach(key => operating[key] = operations[key](operating[key], action));
    return _.assign({}, state, {
      [machineName]: operating
    });
  }
  return state;
}

function images(state = [], action: AsyncAction) {
  if (action.type === ACTION_TYPES.FETCH_IMAGE_LIST && action.asyncStatus === ASYNC_STATUS.COMPLETED) {
    return action.result;
  } else if (action.type === ACTION_TYPES.PULL_IMAGE && action.asyncStatus === ASYNC_STATUS.START){
    const images = state.slice();
    const options = action.args[0];
    images.unshift(createImageTemp(options));
    return images;
  }
  return state;
}

function operating(state = {}, action: AsyncAction) {
  if (action.asyncStatus) {
    const operating:any = _.assign({}, state);
    _.keys(localOperations).forEach(key => operating[key] = localOperations[key](operating[key], action));
    return operating;
  }
  return state;
}

function showAll(state = false, action) {
  switch(action.type) {
    case ACTION_TYPES.SET_SHOW_ALL_IMAGE:
      return action.value;
  }
  return state;
}

export default combineReducers({
  operatingByMachineName,
  imagesByMachineName,
  images,
  operating,
  showAll
})
