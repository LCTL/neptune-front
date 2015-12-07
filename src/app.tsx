import * as React from 'react';
import { render } from 'react-dom';
import { RouteActions } from './actions/route-action';
import { HistoryActions } from './actions/history-action';
import { PathInfo } from './stores/route-store';
import {
  App,
  Machines,
  MachineCreation,
  MachineDetail,
  MachineDashboard,
  Containers,
  ContainerCreation
} from './components/view';

const Router = require('react-router').Router;
const IndexRoute = require('react-router').IndexRoute;
const Route = require('react-router').Route;
const Redirect = require('react-router').Redirect;
const createHashHistory = require('history/lib/createHashHistory');
const history = createHashHistory();
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
  dynamicLabel: (route) => route.params.machineName
});
pathInfos.push({
  path: /^\/machines\/[a-zA-Z0-9]+\/containers$/,
  label: 'Containers'
});
pathInfos.push({
  path: /^\/machines\/[a-zA-Z0-9]+\/create-container$/,
  label: 'Create Container'
});

RouteActions.setPathInfos(pathInfos);
HistoryActions.setHistory(history);

document.body.appendChild(content);
render((
  <Router history={history}>
    <Route path='/' component={App} onEnter={RouteActions.enter}>
      <IndexRoute component={Machines} onEnter={RouteActions.enter} />
      <Route path='create-machine' component={MachineCreation} onEnter={RouteActions.enter} />
      <Route path='machines' component={Machines} onEnter={RouteActions.enter} />
      <Route path='machines/:machineName' component={MachineDetail} onEnter={RouteActions.enter}>
        <IndexRoute component={MachineDashboard} onEnter={RouteActions.enter} />
        <Route path='containers' component={Containers} onEnter={RouteActions.enter} />
        <Route path='create-container' component={ContainerCreation} onEnter={RouteActions.enter} />
      </Route>
    </Route>
  </Router>
), content);
