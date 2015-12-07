import * as Reflux from 'reflux';
const notie = require('notie');

const methods = [
  'alert',
  'confirm',
  'input'
];

export const NoticeActions = Reflux.createActions(methods);

methods.forEach(method => {
  NoticeActions[method].listen(function(){
    notie[method].apply(notie, arguments);
  });
});
