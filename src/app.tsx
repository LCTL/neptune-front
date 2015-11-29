import * as React from 'react';
import { render } from 'react-dom';
import { MachineTable } from './components/machine-table';
import { CreateMachineForm } from './components/create-machine-form';

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const content = document.createElement('div');

document.body.appendChild(content);

render((
  <Router>
    <Route path='/index.html' component={MachineTable} />
    <Route path='/' component={MachineTable} />
    <Route path='/create-machine' component={CreateMachineForm} />
  </Router>
), content);
