import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchContainerLogs } from '../../actions/container-actions';
import { abort } from '../../actions/http-request-actions';

@connect(
  state => {
    const containerId = state.router.params.containerId;
    const containersLog = state.container.containerLogsByContainerId[containerId];
    return {
      containerId,
      logWrapper: containersLog
    }
  },
  dispatch => ({
    fetchContainerLogs: bindActionCreators(fetchContainerLogs, dispatch),
    abortLogRequest: bindActionCreators(abort, dispatch)
  }),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    fetchLogs: _.partial(
      dispatchProps.fetchContainerLogs,
      stateProps.containerId
    ),
    abortLogRequest: dispatchProps.abortLogRequest
  })
)
class ContainerLogView extends React.Component<any, any>{
  componentWillUnmount() {
    const { logWrapper, abortLogRequest } = this.props;
    if (logWrapper && logWrapper.requestId) {
      abortLogRequest(logWrapper.requestId);
    }
  }
  componentWillMount() {
    const { containerId, fetchLogs } = this.props;
    fetchLogs({
      follow: true,
      stdout: true,
      stderr: true
    });
  }
  render() {
    const { logWrapper } = this.props;
    if (logWrapper) {
      return (
        <pre className="container logs">
          {logWrapper.logs}
        </pre>
      );
    } else {
      return (
        <noscript />
      )
    }
  }
}

export default ContainerLogView;
