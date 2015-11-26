import * as Reflux from 'reflux';
import * as request from 'superagent';
import { MachinesActions } from '../actions/machines-action';

export interface MachineModel {
  name: string,
  active: boolean,
  driver: string,
  state:  string,
  url: string,
  swarm?: string
}

export const MachinesStore = Reflux.createStore({
  listenables: MachinesActions,
  machines: [],
  getInitialState: function() {
    return this.machines;
  },
  onLoad: function() {
    request.get('/api/machines').end((err, res) => {
      this.machines = res.body
      this.trigger(this.machines);
    });
  }
});
