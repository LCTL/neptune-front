import * as Reflux from 'reflux';
import api from '../api/machine-api';
import { MachineActions } from '../actions/machine-action';

export interface MachineModel {
  name: string,
  active: boolean,
  driver: string,
  state: string,
  url: string,
  swarm?: string
}

export const MachinesStore = Reflux.createStore({
  listenables: MachineActions,
  machines: [],
  init: function () {
    this.machines = [];
  },
  getInitialState: function() {
    return this.machines;
  },
  onLoad: function() {
    api.list().then(res => {
      this.machines = res.body;
      this.trigger(this.machines);
    });
  }
});

export const MachineIndexedStore = Reflux.createStore({
  listenables: MachineActions,
  init: function() {
    this.machines = {};
  },
  getInitialState: function() {
    return this.machines;
  },
  onCreate: function(name, driver, swarm) {
    api.create(name, driver, swarm).then(res => {
      let name = res.body.Driver.MachineName;
      this.machines[name] = res.body;
      this.trigger(this.machines);
    });
  }
});
