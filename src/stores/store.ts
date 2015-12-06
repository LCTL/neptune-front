export const IndexedStoreMixin = {
  init: function() {
    this.map = {}
  },
  getInitialState: function() {
    return this.map;
  }
}
