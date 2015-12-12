import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as machineActions from '../../actions/machine-actions';
import * as driverActions from '../../actions/driver-actions';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers';
import Breadcrumb from '../shared/breadcrumb'
import MachineCreationForm from '../machine/creation-form';

@connect(
  (state) => ({
    router: state.router,
    selectedDriver: state.driver.selected
  }),
  (dispatch) => ({
    machineActions: bindActionCreators(machineActions, dispatch),
    driverActions: bindActionCreators(driverActions, dispatch)
  })
)
class MachineCreationView extends React.Component<any, any> {
  render() {
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Create Machine
        </HugeHeader>
        <Breadcrumb router={this.props.router} />
        <MachineCreationForm {...this.props} />
      </OneColumn>
    )
  }
}

export default MachineCreationView;
