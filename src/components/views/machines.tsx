import * as React from 'react';
import { connect } from 'react-redux';
import { fetchList } from '../../actions/machine-actions';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers';
import Breadcrumb from '../shared/breadcrumb'
import MachineTable from '../machine/table';

const MachinesReloader = connect((state => ({operating: state.machine.operating})))(React.createClass<any, any>({
  render: function() {
    this.props.dispatch(fetchList());
    return (
      <span />
    )
  }
}));

export default connect((state => ({machines: state.machine.machinesByName})))(React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <MachinesReloader />
        <HugeHeader icon="server">
          Machines
        </HugeHeader>
        <Breadcrumb />
        <MachineTable machines={this.props.machines} />
      </OneColumn>
    )
  }
}));
