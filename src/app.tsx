import * as React from 'react';
import { render } from 'react-dom';
import { Machines } from './components/machines';
import { CreateMachineForm } from './components/create-machine-form';

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const content = document.createElement('div');

document.body.appendChild(content);

render((
  <Router>
    <Route path='/index.html' component={Machines} />
    <Route path='/' component={Machines} />
    <Route path='/create-machine' component={CreateMachineForm} />
  </Router>
), content);
