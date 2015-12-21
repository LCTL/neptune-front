import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hostUrlFnFactory } from '../../utils/container-utils';
import ContainerInfo from '../container/info';

@connect(
  state => {
    const machineName = state.router.params.machineName;
    const containerId = state.router.params.containerId;
    const containerInfosByMachineName = state.container.containerInfosByMachineName;
    if (_.has(containerInfosByMachineName, `${machineName}.${containerId}`)) {
      var containerInfo = containerInfosByMachineName[machineName][containerId];
    }
    return {
      machineName,
      containerInfo: containerInfo,
    }
  },
  dispatch => ({}),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    createHostUrl: hostUrlFnFactory(stateProps.machineIp)
  })
)
class MachineContainerInfoView extends React.Component<any, any>{
  render() {
    const { containerInfo, createHostUrl } = this.props;
    if (containerInfo) {
      return (
        <ContainerInfo info={containerInfo} createHostUrl={createHostUrl} />
      );
    } else {
      return (
        <noscript />
      );
    }
  }
}

export default MachineContainerInfoView;
