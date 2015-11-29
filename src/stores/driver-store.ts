import * as Reflux from 'reflux';
import api from '../api/machine-api';
import { DriverActions } from '../actions/driver-action';

export interface DriverModel {
  name: string,
  label: string
}

export const DriversStore = Reflux.createStore({
  listenables: DriverActions,
  drivers: [],
  init: function () {
    var drivers: DriverModel[] = [
      {
        name: 'virtualbox',
        label: 'Oracle VirtualBox'
      }
    ];
    this.drivers = drivers;
  },
  getInitialState: function() {
    return this.drivers;
  },
  onLoad: function() {
    this.trigger(this.drivers);
  }
});

export const SelectedDriverStore = Reflux.createStore({
  listenables: DriverActions,
  onSelect: function(driver: DriverModel) {
    this.driver = driver;
    this.trigger(this.driver);
  }
});
