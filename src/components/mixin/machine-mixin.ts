import * as Reflux from 'reflux';
import { MachineNameOperatingStore } from '../../stores/machine-store';

export const MachineOperationMixin = {
  componentDidMount: function() {
    var store:any = MachineNameOperatingStore;
    this.unsubscribe = store.listen(this.onOperating);
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
    var operating = false;
    names.forEach(name => {
      if (name === this.getMachineName()) {
        operating = true
        this.state.operating = true;
        this.setState(this.state);
      }
    });
    if (operating === false) {
      this.state.operating = false;
      this.setState(this.state);
    }
  },
}
