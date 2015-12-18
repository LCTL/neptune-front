import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchIp } from '../../actions/machine-actions';
import { MachineProps } from '../shared/props';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers'
import Breadcrumb from '../shared/breadcrumb'
import { MachineDetailMenu } from '../shared/menus'

@connect(
  state => ({
    router: state.router,
    machineName: state.router.params.machineName
  }),
  dispatch => ({
    fetchIp: bindActionCreators(fetchIp, dispatch)
  })
)
class MachineDetailFrameset extends React.Component<any, any>{
  componentWillMount() {
    const { machineName, fetchIp } = this.props;
    fetchIp(machineName);
  }
  render() {
    var machineName = this.props.machineName;
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Machine: {machineName}
        </HugeHeader>
        <Breadcrumb router={this.props.router} />
        <MachineDetailMenu machineName={machineName} router={this.props.router} />
        {this.props.children}
      </OneColumn>
    );
  }
}

export default MachineDetailFrameset;
