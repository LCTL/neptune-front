import * as Reflux from 'reflux';

const historyApiBinding = (action, history, historyMethod) => {
  action.listen(function() {
    if (history) {
      history[historyMethod].apply(history, arguments);
    }
  });
};

const historySupportedMethods = [
  'push',
  'replace',
  'go',
  'goBack',
  'goForward'
];

export const RouteActions = Reflux.createActions([
  'enter',
  'setPathInfos',
  'addPathInfos'
]);

export const HistoryActions = Reflux.createActions([
  'setHistory'
].concat(historySupportedMethods));

HistoryActions.setHistory.listen((history) => {
  historySupportedMethods.forEach(method => historyApiBinding(HistoryActions[method], history, method));
});
