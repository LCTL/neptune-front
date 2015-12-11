import * as React from 'react';
import { connect } from 'react-redux';
import { fetchStatus } from '../../actions/machine-actions';
import { fetchDockerInfo } from '../../actions/docker-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import MachineDashboard from '../machine/dashboard';
import {
  AutoSwitchStartStopMachineButton,
  RemoveMachineButton
} from '../machine/buttons';

const DashboardProps = (state) => ({
  statuses: state.machine.statusesByName,
  dockerInfos: state.docker.infosByName
})

const MachineReloader = connect((state => ({operating: state.machine.operating})))(React.createClass<any, any>({
  render: function() {
    this.props.dispatch(fetchStatus(this.props.machineName));
    this.props.dispatch(fetchDockerInfo(this.props.machineName));
    return (
      <span />
    )
  }
}));

export default connect(DashboardProps)(React.createClass<any, any>({
  render: function() {
    const machineName = this.props.params.machineName;
    const status = this.props.statuses[machineName];
    var dockerInfo;
    if (status === 'Running'){
       dockerInfo = this.props.dockerInfos[machineName];
    }
    return (
      <OneColumn>
        <MachineReloader machineName={machineName} />
        <OneColumn>
          <RemoveMachineButton className="labeled right floated" machineName={machineName}>
            Remove
          </RemoveMachineButton>
          <AutoSwitchStartStopMachineButton
            className="labeled right floated"
            machineName={machineName}
            stopChildren="Stop"
            startChildren="Start" />
        </OneColumn>
        <CenterCircularHeader icon="server">
          {machineName}
        </CenterCircularHeader>
        <MachineDashboard machineName={this.props.params.machineName} status={status} dockerInfo={dockerInfo} />
      </OneColumn>
    );
  }
}));
