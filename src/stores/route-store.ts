import * as Reflux from 'reflux';
import api from '../api/machine-api';
import { RouteActions } from '../actions/route-action';

export const RouteStore = Reflux.createStore({
  listenables: RouteActions,
  init: function () {
    this.route = [];
  },
  getInitialState: function() {
    return this.route;
  },
  onEnter: function(route) {
    this.route = route;
    this.trigger(this.route);
  }
});
