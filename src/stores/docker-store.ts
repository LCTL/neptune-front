import * as _ from 'lodash';
import * as Reflux from 'reflux';
import { Request, Response } from 'superagent';
import { DockerActions } from '../actions/docker-action';

export const DockerInfoIndexedStore = Reflux.createStore({
  listenables: DockerActions,
  init: function() {
    this.infos = {};
  },
  getInitialState: function() {
    return this.infos;
  },
  onLoadInfoCompleted: function (res:Response, machineName: string) {
    this.infos[machineName] = res.body;
    this.trigger(this.infos);
  }
});
