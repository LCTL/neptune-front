import * as React from 'react';
import { render } from 'react-dom';
import { PATH_INFOS } from './constants/path';
import { RouteActions } from './actions/route-action';
import { HistoryActions } from './actions/history-action';
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

RouteActions.setPathInfos(PATH_INFOS);
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
