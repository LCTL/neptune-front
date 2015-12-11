import * as React from 'react';
import { render } from 'react-dom';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { PATH_INFOS } from './constants/path';
import {
  App,
  Machines,
  MachineCreation,
  MachineDetail,
  MachineDashboard,
  Containers,
  ContainerCreation
} from './components/view';
import {
  machines,
  machineOperating,
  machineStatusesByName
} from './reducers/machine-reducer';
import {
  driver
} from './reducers/driver-reducer'
import { container } from './reducers/container-reducer'
import { docker } from './reducers/docker-reducer';

const thunkMiddleware = require('redux-thunk');
const {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter,
  pushState
} = require('redux-router');

const {
  Router,
  IndexRoute,
  Route,
  Redirect
} = require('react-router')

const createHistory = require('history/lib/createHashHistory');
const reducer = combineReducers({
  router: routerStateReducer,
  machines: machines,
  machineOperating,
  machineStatusesByName,
  driver,
  docker,
  container
});
const store = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ createHistory })
)(createStore)(reducer);

const content = document.createElement('div');
document.body.appendChild(content);
render((
  <Provider store={store}>
    <ReduxRouter>
      <Route path='/' component={App}>
        <IndexRoute component={Machines} />
        <Route path='create-machine' component={MachineCreation} />
        <Route path='machines' component={Machines} />
        <Route path='machines/:machineName' component={MachineDetail}>
          <IndexRoute component={MachineDashboard} />
          <Route path='containers' component={Containers} />
          <Route path='create-container' component={ContainerCreation} />
        </Route>
      </Route>
    </ReduxRouter>
  </Provider>
), content);
