import * as _ from 'lodash';
import * as Reflux from 'reflux';
import { MachineNameOperatingStore } from '../../stores/machine-store';

export const MachineActionMixin = {
  getInitialState: function() {
    return {
      loading: false
    };
  },
  onAction: function() {
    this.state.loading = true;
    this.setState(this.state);
  }
}

export const MachineOperationMixin = {
  componentDidMount: function() {
    var store:any = MachineNameOperatingStore;
    this.unsubscribe = store.listen(this.onOperating);
    this.onOperating(store.names);
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  getInitialState: function() {
    return {
      operating: false
    };
  },
  onOperating: function(names) {
    if (_.has(this.state, 'machineName')) {
      var operating = false;
      names.forEach(name => {
        if (name === this.state.machineName) {
          operating = true
          this.state.operating = true;
          this.setState(this.state);
        }
      });
      if (operating === false) {
        this.state.operating = false;
        this.setState(this.state);
      }
    }
  },
}
