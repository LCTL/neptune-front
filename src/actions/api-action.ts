export const apiChildrenActions = {
  asyncResult: true,
  children: ['start', 'end']
};

export function bindApi(action, api, apiMethodName) {
  action.listen(function() {
    const args = arguments
    this.start.apply(this, args);
    api[apiMethodName].apply(api, args)
      .then(this.completed)
      .catch(this.failed)
      .finally(() => this.end.apply(this, args));
  })
}
