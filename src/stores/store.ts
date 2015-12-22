import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import machine from '../reducers/machine-reducer';
import driver from '../reducers/driver-reducer'
import container from '../reducers/container-reducer'
import docker from '../reducers/docker-reducer';
import image from '../reducers/image-reducer';
import registry from '../reducers/registry-reducer';
import error from '../reducers/error-reducer';
import httpRequest from '../reducers/http-request-reducer';

const createLogger = require('redux-logger');
const createHistory = require('history/lib/createHashHistory');
const thunkMiddleware = require('redux-thunk');
const logger = createLogger();
const {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter,
  pushState
} = require('redux-router');

const reducer = combineReducers({
  router: routerStateReducer,
  machine,
  driver,
  docker,
  container,
  image,
  registry,
  error,
  httpRequest
});

export default compose(
  applyMiddleware(thunkMiddleware, logger),
  reduxReactRouter({ createHistory })
)(createStore)(reducer);
