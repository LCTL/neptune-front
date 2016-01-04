import * as _ from 'lodash'
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hostUrlFnFactory } from '../../utils/container-utils';
import { concatObjectArrays } from '../../utils/object-utils';
import * as containerActions from '../../actions/container-actions';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers';
import { ContainerDetailMenu } from '../shared/menus';
import {
  AutoSwitchStartStopButton,
  RemoveContainerButton,
  PauseToggleContainerButton
} from '../container/buttons';

@connect(
  state => {
    const router = state.router;
    const containerId = state.router.params.containerId;
    const containerInfo = state.container.containerInfosByContainerId[containerId];
    const operating = state.container.operating;
    return {
      router,
      containerId,
      operating,
      containerInfo: containerInfo
    }
  },
  dispatch => ({
    containerActions: bindActionCreators(containerActions, dispatch),
  }),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    inspect: dispatchProps.containerActions.inspectContainer,
    startContainer: dispatchProps.containerActions.startContainer,
    stopContainer: dispatchProps.containerActions.stopContainer,
    removeContainer: dispatchProps.containerActions.removeContainer,
    pauseContainer: dispatchProps.containerActions.pauseContainer,
    unpauseContainer: dispatchProps.containerActions.unpauseContainer,
    fetchContainerLogs: dispatchProps.containerActions.fetchContainerLogs
  })
)
class ContainerDetailFrameset extends React.Component<any, any>{
  componentWillMount() {
    const { inspect, containerId, fetchContainerLogs } = this.props;
    inspect(containerId);
  }
  componentWillReceiveProps(nextProps) {
    const { containerId, operating, inspect, history } = this.props;
    const currentOperating = concatObjectArrays(_.omit(operating, 'inspect'));
    const nextOperating = concatObjectArrays(nextProps.operating);
    const remove = operating.remove;
    const nextRemove = nextProps.operating.remove;
    if (remove.indexOf(containerId) > -1
      && nextRemove.indexOf(containerId) === -1) {
      history.pushState(null, `/containers`);
    } else if (
      _.includes(currentOperating, containerId)
      && !_.includes(nextOperating, containerId)){
      inspect(containerId);
    }

  }
  render() {
    const {
      router,
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
        <HugeHeader icon="grid layout">
          Container: {containerInfo && containerInfo.Name ? containerInfo.Name.substring(1) : ''}
        </HugeHeader>
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
        <ContainerDetailMenu router={router} containerId={containerId} />
        <br />
        {children}
      </OneColumn>
    )
  }
}

export default ContainerDetailFrameset;
