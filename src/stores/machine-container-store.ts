import * as Reflux from 'reflux';
import { Response } from 'superagent';
import { MachineContainerActions } from '../actions/machine-container-action';
import { IndexedStoreMixin } from './store';

export const MachineContainerIndexedStore = Reflux.createStore({
  mixins: [IndexedStoreMixin],
  listenables: MachineContainerActions,
  onLoadListCompleted: function(res: Response, machineName: string) {
    this.map[machineName] = {};
    res.body.forEach(item => {this.map[machineName][item.Id] = item});
    this.trigger(this.map);
  }
});
