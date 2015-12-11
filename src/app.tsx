import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import {
  App,
  Machines,
  MachineCreation,
  MachineDetail,
  MachineDashboard,
  Containers,
  ContainerCreation
} from './components/view';

const { ReduxRouter } = require('redux-router');
const { IndexRoute, Route } = require('react-router');
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
