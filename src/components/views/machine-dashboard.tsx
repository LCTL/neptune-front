import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as machineActions from '../../actions/machine-actions';
import * as dockerActions from '../../actions/docker-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import MachineDashboard from '../machine/dashboard';
import {
  AutoSwitchStartStopMachineButton,
  RemoveMachineButton
} from '../machine/buttons';

@connect(
  (state) => ({
    operating: state.machine.operating,
    statuses: state.machine.statusesByName,
    dockerInfos: state.docker.infosByName
  }),
  (dispatch) => ({
    machineActions: bindActionCreators(machineActions, dispatch),
    dockerActions: bindActionCreators(dockerActions, dispatch),
  }))
class MachineDashboardView extends React.Component<any, any>{
  _reload() {
    const { machineName } = this.props.params;
    const { fetchStatus } = this.props.machineActions;
    const { fetchDockerInfo } = this.props.dockerActions
    fetchStatus(machineName);
    fetchDockerInfo(machineName);
  }

  componentWillMount() {
    this._reload();
  }

  componentWillReceiveProps(nextProps) {
    const { machineActions, operating } = this.props;
    if (operating !== nextProps.operating){
      this._reload();
    }
  }

  render() {
    const { machineName } = this.props.params;
    const { operating } = this.props
    const { start, stop, remove } = this.props.machineActions;
    const status = this.props.statuses[machineName];
    var dockerInfo;
    if (status === 'Running'){
       dockerInfo = this.props.dockerInfos[machineName];
    }
    return (
      <OneColumn>
        <OneColumn>
          <RemoveMachineButton
            className="labeled right floated"
            machineName={machineName}
            operating={operating}
            remove={remove}>
            Remove
          </RemoveMachineButton>
          <AutoSwitchStartStopMachineButton
            className="labeled right floated"
            machineName={machineName}
            stopChildren="Stop"
            startChildren="Start"
            status={status}
            operating={operating}
            start={start}
            stop={stop} />
        </OneColumn>
        <CenterCircularHeader icon="server">
          {machineName}
        </CenterCircularHeader>
        <MachineDashboard machineName={machineName} status={status} dockerInfo={dockerInfo} />
      </OneColumn>
    );
  }
};

export default MachineDashboardView;
