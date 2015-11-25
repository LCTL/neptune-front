import * as Reflux from 'reflux';
import * as MachinesActions from '../actions/machines-action';
import * as request from 'superagent';

const MachinesStore = Reflux.createStore({
  listenables: MachinesActions,
  getInitialState: () => {
    return [];
  },
  onLoad: function() {
    request.get('/api/machines').end((err, res) => {
      this.machines = res.body;
      this.trigger(this.machines);
    });
  }
});

export = MachinesStore
