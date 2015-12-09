import ASYNC_STATUS from '../constants/async-status';
import { FETCH_MACHINE_LIST } from '../constants/action-type';

export function machines(state = [], action) {
  if (action.type === FETCH_MACHINE_LIST) {
    switch (action.asyncStatus) {
      case ASYNC_STATUS.COMPLETED:
        return action.result;
      default:
        return state;
    }
  } else {
    return state;
  }
}
