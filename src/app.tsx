import * as React from 'react';
import { render } from 'react-dom';

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const Machines = require('./components/machines').Machines;
const content = document.createElement('div');

document.body.appendChild(content);

render((
  <Router>
    <Route path='/' component={Machines} />
  </Router>
), content);
