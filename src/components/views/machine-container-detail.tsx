import * as _ from 'lodash'
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { inspectMachineContainer } from '../../actions/container-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import ContainerInfo from '../container/info';

@connect(
  state => {
    const machineName = state.router.params.machineName;
    const machineIp = state.machine.ipsByName[machineName];
    const containerId = state.router.params.containerId;
    const containerInfosByMachineName = state.container.containerInfosByMachineName;
    if (_.has(containerInfosByMachineName, `${machineName}.${containerId}`)) {
      var containerInfo = containerInfosByMachineName[machineName][containerId];
    }
    return {
      machineName,
      machineIp,
      containerId,
      containerInfo: containerInfo
    }
  },
  dispatch => ({
    inspectMachineContainer: bindActionCreators(inspectMachineContainer, dispatch)
  }),
  (stateProps, dispatchProps) => _.assign({}, stateProps, {
    inspect: _.partial(dispatchProps.inspectMachineContainer, stateProps.machineName),
    createHostUrl: (hostPort: string) => {
      return `http://${stateProps.machineIp}:${hostPort}`
    }
  })
)
class MachineContainerCreationView extends React.Component<any, any>{
  componentWillMount() {
    const { inspect, containerId } = this.props;
    inspect(containerId);
  }
  render() {
    const { containerInfo, createHostUrl } = this.props;
    return (
      <OneColumn>
        <CenterCircularHeader icon="grid layout">
          {containerInfo && containerInfo.Name ? containerInfo.Name.substring(1) : ''}
        </CenterCircularHeader>
        <br />
        {
          (() => {
            if (containerInfo) {
              return (<ContainerInfo info={containerInfo} createHostUrl={createHostUrl} />)
            }
          })()
        }
      </OneColumn>
    )
  }
}

export default MachineContainerCreationView;
