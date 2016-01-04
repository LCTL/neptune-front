import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hostUrlFnFactory } from '../../utils/container-utils';
import ContainerInfo from '../container/info';

@connect(
  state => {
    const containerId = state.router.params.containerId;
    const containerInfo = state.container.containerInfosByContainerId[containerId];
    return {
      containerInfo: containerInfo,
    }
  },
  dispatch => ({}),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    createHostUrl: hostUrlFnFactory('127.0.0.1')
  })
)
class ContainerInfoView extends React.Component<any, any>{
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

export default ContainerInfoView;
