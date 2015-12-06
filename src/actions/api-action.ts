export const apiChildrenActions = {
  asyncResult: true,
  children: ['start', 'end']
};

export function bindApi(action, api, apiMethodName) {
  action.listen(function() {
    const args = Array.prototype.slice.call(arguments);
    this.start.apply(this, args);
    api[apiMethodName].apply(api, args)
      .then(_.partialRight(this.completed, ...args))
      .catch(_.partialRight(this.failed, ...args))
      .finally(() => this.end.apply(this, args));
  })
}
