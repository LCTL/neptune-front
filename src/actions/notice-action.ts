import * as Reflux from 'reflux';
import { bindObjectMethod } from './action'
const notie = require('notie');

const methods = [
  'alert',
  'confirm',
  'input'
];

export const NoticeActions = Reflux.createActions(methods);

methods.forEach(method =>
  bindObjectMethod(NoticeActions[method], notie, method)
);
