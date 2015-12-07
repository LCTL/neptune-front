import * as Reflux from 'reflux';

const historySupportedMethods = [
  'push',
  'replace',
  'go',
  'goBack',
  'goForward'
];

export const HistoryActions = Reflux.createActions([
  'setHistory'
].concat(historySupportedMethods));

HistoryActions.setHistory.listen((history) => {
  historySupportedMethods.forEach(method => {
    HistoryActions[method].listen(function() {
      history[method].apply(history, arguments);
    });
  });
});
