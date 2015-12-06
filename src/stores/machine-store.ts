import * as _ from 'lodash';
import * as Reflux from 'reflux';
import api from '../api/machine-api';
import { Request, Response } from 'superagent';
import { MachineActions } from '../actions/machine-action';
import { IndexedStoreMixin } from './store';

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
  onLoadCompleted: function (res:Response) {
    this.machines = {};
    res.body.forEach(machine => this.machines[machine.name] = machine);
    this.trigger(this.machines);
  },
  onStartCompleted: function (res: Response, name: string) {
    this.machines[name].state = 'Running';
    this.trigger(this.machines);
  },
  onStopCompleted: function (res: Response, name: string) {
    this.machines[name].state = 'Stopped';
    this.trigger(this.machines);
  },
  onRemoveCompleted: function (res: Response, name: string) {
    delete this.machines[name];
    this.trigger(this.machines);
  }
});

export const MachineNameOperatingDetailStore = Reflux.createStore({
  listenables: MachineActions,
  init: function() {
    this.operating = {
      create: [],
      remove: [],
      start: [],
      stop: []
    }
  },
  onCreateStart: function(name) {
    this._push('create', name);
  },
  onCreateEnd: function(name) {
    this._remove('create', name);
  },
  onRemoveStart: function(name) {
    this._push('remove', name);
  },
  onRemoveEnd: function(name) {
    this._remove('remove', name);
  },
  onStartStart: function(name) {
    this._push('start', name);
  },
  onStartEnd: function(name) {
    this._remove('start', name);
  },
  onStopStart: function(name) {
    this._push('stop', name);
  },
  onStopEnd: function(name) {
    this._remove('stop', name);
  },
  _push: function(action:string, name) {
    this.operating[action].push(name);
    this.trigger(this.operating);
  },
  _remove: function(action:string, name) {
    _.pull(this.operating[action], name);
    this.trigger(this.operating);
  }
});

export const MachineNameOperatingStore = Reflux.createStore({
  init: function() {
    this.names = [];
    this.listenTo(MachineNameOperatingDetailStore, this.mergeName);
  },
  mergeName: function(operating) {
    this.names = []
    _.values(operating).forEach(names => this.names = this.names.concat(names));
    this.trigger(this.names);
  },
});

export const MachineStatusIndexedStore = Reflux.createStore({
  mixins: [IndexedStoreMixin],
  listenables: MachineActions,
  onLoadStatusCompleted: function(res: Response, name: string) {
    this.map[name] = res.body.value;
    this.trigger(this.map);
  }
});

export const MachineInspectObjectIndexedStore = Reflux.createStore({
  mixins: [IndexedStoreMixin],
  listenables: MachineActions,
  onInspectCompleted: function(res: Response, name: string) {
    this.map[name] = res.body;
    this.trigger(this.map);
  }
});
