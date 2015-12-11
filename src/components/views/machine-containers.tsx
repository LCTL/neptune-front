import * as React from 'react';
import { connect } from 'react-redux';
import { fetchMachineContainerList } from '../../actions/container-actions';
import { OneColumn } from '../shared/grid';
import { CenterCircularHeader } from '../shared/header';
import { ToCreateContainerButton } from '../container/button';
import { MachineContainerTable } from '../container/table';

export default connect(state => ({containersByName: state.container.containersByMachineName}))(React.createClass<any, any>({
  componentWillMount: function() {
    const machineName = this.props.params.machineName;
    this.props.dispatch(fetchMachineContainerList(machineName, {all: true}));
  },
  render: function() {
    const machineName = this.props.params.machineName;
    const { containersByName } = this.props;
    return (
      <OneColumn>
        <OneColumn>
          <ToCreateContainerButton machineName={machineName} className="right floated" />
        </OneColumn>
        <CenterCircularHeader icon="grid">
          Containers
        </CenterCircularHeader>
        <br />
        <MachineContainerTable machineName={machineName} containers={containersByName[machineName]} />
      </OneColumn>
    );
  }
}));
