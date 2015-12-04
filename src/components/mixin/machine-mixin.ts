import * as _ from 'lodash';
import * as Reflux from 'reflux';
import {
  MachineNameOperatingDetailStore,
  MachineNameOperatingStore
} from '../../stores/machine-store';

function getStateMachineName(state:any) {
  if (_.has(state, 'machineName')){
    return state.machineName;
  } else {
    return undefined;
  }
}

export const MachineActionLoadingMixin = function(action:string) {
  return {
    getInitialState: function() {
      return {
        loading: false
      };
    },
    componentDidMount: function() {
      var store:any = MachineNameOperatingDetailStore;
      this.unsubscribe = store.listen(this.onOperatingDetail);
      this.onOperatingDetail(store.operating);
    },
    componentWillUnmount: function() {
      this.unsubscribe();
    },
    onOperatingDetail: function(operating) {
      var exist = _.includes(operating[action], getStateMachineName(this.state));
      this.setState({
        loading: exist
      });
    }
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
    var exist = _.includes(names, getStateMachineName(this.state));
    this.setState({
      operating: exist
    });
  },
}

export const MachinePropsMixin = {
  getInitialState: function() {
    return {
      machineName: this.props.machine.name
    };
  },
}
