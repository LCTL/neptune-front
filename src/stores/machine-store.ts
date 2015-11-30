import * as _ from 'lodash';
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

export const MachineIndexedStore = Reflux.createStore({
  listenables: MachineActions,
  init: function() {
    this.machines = {};
  },
  getInitialState: function() {
    return this.machines;
  },
  onLoad: function () {
    api.list().then(res => {
      this.machines = {};
      res.body.forEach(machine => this.machines[machine.name] = machine);
      this.trigger(this.machines);
    });
  },
  onCreate: function(name, driver, swarm) {
    api.create(name, driver, swarm).then(res => {
      let name = res.body.Driver.MachineName;
      this.machines[name] = res.body;
      this.trigger(this.machines);
    });
  },
  onRemove: function(machine: MachineModel) {
    api.remove(machine.name).then(() => {
      delete this.machines[machine.name];
      this.trigger(this.machines);
    });
  },
  onStart: function(machine: MachineModel) {
    api.start(machine.name).then(() => {
      //TODO Fix Chrome display warning: a promise was created in a  handler but was not returned from it
      this.onLoad();
    });
  },
  onStop: function(machine: MachineModel) {
    api.stop(machine.name).then(() => {
      //TODO Fix Chrome display warning: a promise was created in a  handler but was not returned from it
      this.onLoad();
    });
  }
});

export const MachineNameOperatingStore = Reflux.createStore({
  listenables: MachineActions,
  init: function() {
    this.listenTo(MachineIndexedStore, this._complete);
    this.names = [];
    this.operating = {
      create: [],
      remove: [],
      start: [],
      stop: []
    }
  },
  _complete: function(machines) {
    const filter = (name: string) => machines[name] !== undefined;
    this.operating.create = _.remove(this.operating.create, filter);
    this.operating.remove = _.remove(this.operating.remove, (name:string) => !filter(name));
    this.operating.start = _.remove(this.operating.create, filter);
    this.operating.stop = _.remove(this.operating.create, filter);
    this.names = []
    _.values(this.operating).forEach(names => this.names = this.names.concat(names));
    this.trigger(this.names);
  },
  onCreate: function(name) {
    this._push('create', name);
  },
  onRemove: function(machine) {
    this._push('remove', machine.name);
  },
  onStart: function(machine) {
    this._push('start', machine.name);
  },
  onStop: function(machine) {
    this._push('stop', machine.name);
  },
  _push: function(action:string, name) {
    this.names.push(name);
    this.operating[action].push(name);
    this.trigger(this.names);
  }
});
