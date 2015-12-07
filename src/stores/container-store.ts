import * as Reflux from 'reflux';
import { Response } from 'superagent';
import { ContainerActions } from '../actions/container-action';
import { IndexedStoreMixin } from './store';

export const ContainerIndexedStore = Reflux.createStore({
  mixins: [IndexedStoreMixin],
  listenables: ContainerActions,
  onLoadListCompleted: function(res: Response, machineName: string) {
    this.map[machineName] = {};
    res.body.forEach(item => {this.map[machineName][item.Id] = item});
    this.trigger(this.map);
  }
});
