import api from '../api/machine-api';

export const apiChildrenActions = {
  asyncResult: true,
  children: ['start', 'end']
};

export function bindApi(action, apiMethodName) {
  action.listen(function() {
    const args = arguments
    this.start.apply(this, args);
    api[apiMethodName].apply(api, arguments)
      .then(this.completed)
      .catch(this.failed)
      .finally(() => this.end.apply(this, args));
  })
}
