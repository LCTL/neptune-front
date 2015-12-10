import { combineReducers } from 'redux';
import { SELECT_DRIVER } from '../constants/action-type';

function selected(state = {}, action) {
  switch (action.type) {
    case SELECT_DRIVER:
      return action.driver;
    default:
      return state;
  }
}

export const driver = combineReducers({
  selected
})
