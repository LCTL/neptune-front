import * as Reflux from 'reflux';

export const DriverActions = Reflux.createActions([
  'load', 'select'
]);

//----
import { SELECT_DRIVER } from '../constants/action-type';
import { Driver } from '../constants/drivers';

export const select = (driver: Driver) => (dispatch) => dispatch({
  type: SELECT_DRIVER,
  driver: driver
});
