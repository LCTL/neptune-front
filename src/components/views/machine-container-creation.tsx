import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMachineContainer } from '../../actions/container-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import MachineContainerCreationForm from '../container/creation-form';

@connect(
  state => ({
    machineName: state.router.params.machineName
  }),
  dispatch => ({
    createMachineContainer: bindActionCreators(createMachineContainer, dispatch)
  })
)
class MachineContainerCreationView extends React.Component<any, any>{
  render() {
    const { machineName, createMachineContainer } = this.props;
    return (
      <OneColumn>
        <CenterCircularHeader icon="grid layout">
          Create Container
        </CenterCircularHeader>
        <MachineContainerCreationForm
          machineName={machineName}
          createMachineContainer={createMachineContainer} />
      </OneColumn>
    )
  }
}

export default MachineContainerCreationView;
