import * as React from 'react';
import { render } from 'react-dom';
import { Machines } from './components/machines';

const Router = require('react-router').Router;
const Route = require('react-router').Route;
const content = document.createElement('div');

document.body.appendChild(content);

render((
  <Router>
    <Route path='/' component={Machines} />
  </Router>
), content);
