import * as React from 'react';
import { connect } from 'react-redux';
import { MachineProps } from '../shared/props';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers'
import Breadcrumb from '../shared/breadcrumb'
import { MachineDetailMenu } from '../shared/menus'

@connect((state) => ({
  router: state.router
}))
class MachineDetailFrameset extends React.Component<any, any>{
  render() {
    var machineName = this.props.params.machineName;
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Machine: {machineName}
        </HugeHeader>
        <Breadcrumb router={this.props.router} />
        <MachineDetailMenu machineName={machineName} />
        {this.props.children}
      </OneColumn>
    );
  }
}

export default MachineDetailFrameset;
