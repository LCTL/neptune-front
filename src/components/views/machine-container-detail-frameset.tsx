import * as _ from 'lodash'
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hostUrlFnFactory } from '../../utils/container-utils';
import { concatObjectArrays } from '../../utils/object-utils';
import * as containerActions from '../../actions/container-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import { MachineContainerDetailMenu } from '../shared/menus';
import {
  AutoSwitchStartStopButton,
  RemoveContainerButton,
  PauseToggleContainerButton
} from '../container/buttons';

@connect(
  state => {
    const router = state.router;
    const machineName = state.router.params.machineName;
    const containerId = state.router.params.containerId;
    const containerInfosByMachineName = state.container.containerInfosByMachineName;
    const operating = state.container.operatingByMachineName[machineName];
    if (_.has(containerInfosByMachineName, `${machineName}.${containerId}`)) {
      var containerInfo = containerInfosByMachineName[machineName][containerId];
    }
    return {
      router,
      machineName,
      containerId,
      operating,
      containerInfo: containerInfo
    }
  },
  dispatch => ({
    containerActions: bindActionCreators(containerActions, dispatch),
  }),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    inspect: _.partial(
      dispatchProps.containerActions.inspectMachineContainer,
      stateProps.machineName
    ),
    startContainer: _.partial(
      dispatchProps.containerActions.startMachineContainer,
      stateProps.machineName
    ),
    stopContainer: _.partial(
      dispatchProps.containerActions.stopMachineContainer,
      stateProps.machineName
    ),
    removeContainer: _.partial(
      dispatchProps.containerActions.removeMachineContainer,
      stateProps.machineName
    ),
    pauseContainer: _.partial(
      dispatchProps.containerActions.pauseMachineContainer,
      stateProps.machineName
    ),
    unpauseContainer: _.partial(
      dispatchProps.containerActions.unpauseMachineContainer,
      stateProps.machineName
    ),
    fetchContainerLogs: _.partial(
      dispatchProps.containerActions.fetchMachineContainerLogs,
      stateProps.machineName
    )
  })
)
class MachineContainerDetailFrameset extends React.Component<any, any>{
  componentWillMount() {
    const { inspect, containerId, fetchContainerLogs } = this.props;
    inspect(containerId);
  }
  componentWillReceiveProps(nextProps) {
    const { machineName, containerId, operating, inspect, history } = this.props;
    const currentOperating = concatObjectArrays(_.omit(operating, 'inspect'));
    const nextOperating = concatObjectArrays(nextProps.operating);
    const remove = operating.remove;
    const nextRemove = nextProps.operating.remove;
    if (remove.indexOf(containerId) > -1
      && nextRemove.indexOf(containerId) === -1) {
      history.pushState(null, `/machines/${machineName}/containers`);
    } else if (
      _.includes(currentOperating, containerId)
      && !_.includes(nextOperating, containerId)){
      inspect(containerId);
    }

  }
  render() {
    const {
      router,
      machineName,
      containerId,
      operating,
      containerInfo,
      startContainer,
      stopContainer,
      removeContainer,
      pauseContainer,
      unpauseContainer,
      children
    } = this.props;
    return (
      <OneColumn>
        <OneColumn>
          {
            (() => {
              if (containerInfo
                && containerInfo.State.Running === false
                && containerInfo.State.Restarting === false
              ) {
                return (
                  <RemoveContainerButton
                    className="labeled right floated"
                    operating={operating}
                    containerId={containerInfo.Id}
                    removeContainer={removeContainer}>
                    Remove
                  </RemoveContainerButton>
                )
              }
            })()
          }
          {
            (() => {
              if (containerInfo) {
                return (
                  <AutoSwitchStartStopButton
                    className="labeled right floated"
                    operating={operating}
                    containerId={containerInfo.Id}
                    containerStatus={containerInfo.State.Status}
                    startContainer={startContainer}
                    stopContainer={stopContainer}
                    startChildren="Start"
                    stopChildren="Stop">
                  </AutoSwitchStartStopButton>
                )
              }
            })()
          }
          {
            (() => {
              if (containerInfo && containerInfo.State.Running) {
                const paused = containerInfo.State.Paused;
                return (
                  <PauseToggleContainerButton
                    className="labeled right floated"
                    operating={operating}
                    containerId={containerInfo.Id}
                    paused={paused}
                    pauseContainer={pauseContainer}
                    unpauseContainer={unpauseContainer}>
                    { paused ? 'Unpaused': 'Pause' }
                  </PauseToggleContainerButton>
                )
              }
            })()
          }
        </OneColumn>
        <CenterCircularHeader icon="grid layout">
          {containerInfo && containerInfo.Name ? containerInfo.Name.substring(1) : ''}
        </CenterCircularHeader>
        <MachineContainerDetailMenu router={router} machineName={machineName} containerId={containerId} />
        <br />
        {children}
      </OneColumn>
    )
  }
}

export default MachineContainerDetailFrameset;
