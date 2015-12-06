import * as Reflux from 'reflux';
import api from '../api/machine-api';
import { RouteActions } from '../actions/route-action';

export interface PathInfo {
  path: RegExp,
  label?: string
  dynamicLabel?: (params: any) => string
}

export const RouteStore = Reflux.createStore({
  listenables: RouteActions,
  init: function () {
    this.route = {};
  },
  getInitialState: function() {
    return this.route;
  },
  onEnter: function(route) {
    this.route = route;
    this.trigger(this.route);
  }
});

export const PathInfoStore = Reflux.createStore({
  listenables: RouteActions,
  init: function () {
    this.infos = [];
  },
  getInitialState: function() {
    return this.infos;
  },
  onSetPathInfos: function(infos: PathInfo[]) {
    this.infos = infos;
    this.trigger(this.infos);
  },
  onAddPathInfos: function(info: PathInfo) {
    this.infos.push(info);
    this.trigger(this.infos);
  }
});
