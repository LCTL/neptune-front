import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMachineContainerLogs } from '../../actions/container-actions';

@connect(
  state => {
    const machineName = state.router.params.machineName;
    const containerId = state.router.params.containerId;
    const containersLog = state.container.containerLogsByMachineName;
    if (_.has(containersLog, `${machineName}.${containerId}`)) {
      var logWrapper = containersLog[machineName][containerId];
    }
    return {
      machineName,
      containerId,
      logWrapper
    }
  },
  dispatch => ({
    fetchMachineContainerLogs: bindActionCreators(fetchMachineContainerLogs, dispatch),
  }),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    fetchLogs: _.partial(
      dispatchProps.fetchMachineContainerLogs,
      stateProps.machineName,
      stateProps.containerId
    )
  })
)
class MachineContainerLogView extends React.Component<any, any>{
  componentWillMount() {
    const { containerId, fetchLogs } = this.props;
    fetchLogs({
      stdout: true,
      stderr: true
    });
  }
  render() {
    const { logWrapper } = this.props;
    if (logWrapper) {
      return (
        <pre>
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

export default MachineContainerLogView;
