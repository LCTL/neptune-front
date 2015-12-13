import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import AppFrameset from './components/views/app-frameset';
import Machines from './components/views/machines';
import MachineCreation from './components/views/machine-creation';
import MachineDetail from './components/views/machine-detail-frameset';
import MachineDashboard from './components/views/machine-dashboard'
import MachineContainers from './components/views/machine-containers'
import MachineContainerCreation from './components/views/machine-container-creation';
import MachineImages from './components/views/machine-images';
import MachinePullImage from './components/views/machine-pull-image';

const { ReduxRouter } = require('redux-router');
const { IndexRoute, Route } = require('react-router');
const content = document.createElement('div');

document.body.appendChild(content);

render((
  <Provider store={store}>
    <ReduxRouter>
      <Route path='/' component={AppFrameset}>
        <IndexRoute component={Machines} />
        <Route path='create-machine' component={MachineCreation} />
        <Route path='machines' component={Machines} />
        <Route path='machines/:machineName' component={MachineDetail}>
          <IndexRoute component={MachineDashboard} />
          <Route path='containers' component={MachineContainers} />
          <Route path='create-container' component={MachineContainerCreation} />
          <Route path='images' component={MachineImages} />
          <Route path='pull-image' component={MachinePullImage} />
        </Route>
      </Route>
    </ReduxRouter>
  </Provider>
), content);
