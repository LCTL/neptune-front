import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import AppFrameset from './components/views/app-frameset';
import Machines from './components/views/machines';
import Containers from './components/views/containers';
import ContainerCreation from './components/views/container-creation';
import Images from './components/views/images';
import PullImage from './components/views/pull-image';
import MachineCreation from './components/views/machine-creation';
import MachineDetail from './components/views/machine-detail-frameset';
import MachineDashboard from './components/views/machine-dashboard'
import MachineContainers from './components/views/machine-containers'
import MachineContainerCreation from './components/views/machine-container-creation';
import MachineContainerDetailFrameset from './components/views/machine-container-detail-frameset'
import MachineContainerInfo from './components/views/machine-container-info';
import MachineContainerLog from './components/views/machine-container-log';
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
        <Route path='containers' component={Containers} />
        <Route path='create-container' component={ContainerCreation} />
        <Route path='images' component={Images} />
        <Route path='pull-image' component={PullImage} />
        <Route path='machines/:machineName' component={MachineDetail}>
          <IndexRoute component={MachineDashboard} />
          <Route path='containers' component={MachineContainers} />
          <Route path='create-container' component={MachineContainerCreation} />
          <Route path='containers/:containerId' component={MachineContainerDetailFrameset}>
            <IndexRoute component={MachineContainerInfo} />
            <Route path='info' component={MachineContainerInfo} />
            <Route path='logs' component={MachineContainerLog} />
          </Route>
          <Route path='images' component={MachineImages} />
          <Route path='pull-image' component={MachinePullImage} />
        </Route>
      </Route>
    </ReduxRouter>
  </Provider>
), content);
