import * as React from 'react';
import { render } from 'react-dom';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
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

RouteActions.setPathInfos(PATH_INFOS);
//HistoryActions.setHistory(history);

const content = document.createElement('div');
document.body.appendChild(content);
render((
  <Provider store={store}>
    <ReduxRouter>
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
    </ReduxRouter>
  </Provider>
), content);
