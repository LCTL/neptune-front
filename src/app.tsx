import * as React from 'react';
import { render } from 'react-dom';
import { RouteActions } from './actions/route-action';
import { PathInfo } from './stores/route-store';
import {
  AppContainer,
  MachineContainer,
  CreateMachineFormContainer,
  MachineDashboardContainer
} from './components/container';

const Router = require('react-router').Router;
const IndexRoute = require('react-router').IndexRoute;
const Route = require('react-router').Route;
const Redirect = require('react-router').Redirect;
const content = document.createElement('div');
const pathInfos: PathInfo[] = []

pathInfos.push({
  path: /^\/$/,
  label: 'Home'
});
pathInfos.push({
  path: /^\/create-machine$/,
  label: 'Create Machine'
});
pathInfos.push({
  path: /^\/machines$/,
  label: 'Machines'
});
pathInfos.push({
  path: /^\/machines\/[a-zA-Z0-9]+$/,
  label: 'Machine'
});
RouteActions.setPathInfos(pathInfos);

document.body.appendChild(content);
render((
  <Router>
    <Route path='/' component={AppContainer} onEnter={RouteActions.enter}>
      <IndexRoute component={MachineContainer} onEnter={RouteActions.enter} />
      <Route path='create-machine' component={CreateMachineFormContainer} onEnter={RouteActions.enter} />
      <Route path='machines' component={MachineContainer} onEnter={RouteActions.enter} />
      <Route path='machines/:machineName' component={MachineDashboardContainer} onEnter={RouteActions.enter} />
    </Route>
  </Router>
), content);
