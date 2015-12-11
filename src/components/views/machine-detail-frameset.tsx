import * as React from 'react';
import { MachineProps } from '../shared/props';
import { OneColumn } from '../shared/grid';
import { HugeHeader } from '../shared/header'
import { Breadcrumb } from '../shared/breadcrumb'
import { MachineDetailMenu } from '../shared/menu'

const { Divider } = require('react-semantify');

export default React.createClass<MachineProps, any>({
  render: function() {
    var machineName = this.props.params.machineName;
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Machine: {machineName}
        </HugeHeader>
        <Breadcrumb />
        <MachineDetailMenu machineName={machineName} />
        {this.props.children}
      </OneColumn>
    );
  }
});
