import * as React from 'react';
import { render } from 'react-dom';
import { RouteActions } from './actions/route-action';
import {
  AppContainer,
  MachineContainer,
  CreateMachineFormContainer
} from './components/container';

const Router = require('react-router').Router;
const IndexRoute = require('react-router').IndexRoute;
const Route = require('react-router').Route;
const Redirect = require('react-router').Redirect;
const content = document.createElement('div');

document.body.appendChild(content);

render((
  <Router>
    <Route path='/' component={AppContainer} onEnter={RouteActions.enter}>
      <IndexRoute component={MachineContainer} onEnter={RouteActions.enter} />
      <Route path='/create-machine' component={CreateMachineFormContainer} onEnter={RouteActions.enter} />
    </Route>
  </Router>
), content);
