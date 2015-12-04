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
    var nextState = _.clone(this.state);
    nextState.loading = true;
    this.setState(nextState);
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
      var nextState = _.clone(this.state);
      names.forEach(name => {
        if (name === this.state.machineName) {
          operating = true
          nextState.operating = true;
          this.setState(nextState);
        }
      });
      if (operating === false) {
        nextState.operating = false;
        this.setState(nextState);
      }
    }
  },
}

export const MachinePropsMixin = {
  getInitialState: function() {
    return {
      machineName: this.props.machine.name
    };
  },
}
