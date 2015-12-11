import * as React from 'react';
import { connect } from 'react-redux';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers';
import Breadcrumb from '../shared/breadcrumb'
import MachineCreationForm from '../machine/creation-form';

export default React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Create Machine
        </HugeHeader>
        <Breadcrumb />
        <MachineCreationForm />
      </OneColumn>
    )
  }
});
