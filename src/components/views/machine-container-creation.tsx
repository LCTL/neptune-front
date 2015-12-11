import * as React from 'react';
import { connect } from 'react-redux';
import { OneColumn } from '../shared/grid';
import { CenterCircularHeader } from '../shared/header';
import { MachineContainerCreationForm } from '../container/creation-form';

export default connect()(React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <CenterCircularHeader icon="grid layout">
          Create Container
        </CenterCircularHeader>
        <MachineContainerCreationForm machineName={this.props.params.machineName} dispatch={this.props.dispatch} />
      </OneColumn>
    )
  }
}));
