import * as _ from 'lodash';
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from '../../actions/machine-actions';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers';
import Breadcrumb from '../shared/breadcrumb'
import MachineTable from '../machine/table';

const MachinesStateProps = (state) => ({
  machines: state.machine.machinesByName,
  operating: state.machine.operating
});

const MachinesActionProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch)
})

@connect(MachinesStateProps, MachinesActionProps)
class Machines extends React.Component<any, any>{
  componentWillMount() {
    this.props.action.fetchList();
  }
  componentWillReceiveProps(nextProps) {
    const { action, machines, operating } = this.props;
    if (_.isEmpty(machines) || operating !== nextProps.operating){
      action.fetchList();
    }
  }
  render() {
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Machines
        </HugeHeader>
        <Breadcrumb />
        <MachineTable {...this.props} />
      </OneColumn>
    );
  }
}

export default Machines;
