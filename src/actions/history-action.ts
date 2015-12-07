import * as Reflux from 'reflux';
import { bindObjectMethod } from './action'

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


HistoryActions.setHistory.listen(history =>
  historySupportedMethods.forEach(method =>
    bindObjectMethod(HistoryActions[method], history, method)
  )
);
