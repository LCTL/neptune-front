import * as React from 'react';
import { MachineModel } from '../stores/machines-store';

const Link = require('react-router').Link

export interface Props {
  key: string,
  machine: MachineModel
}
export interface State {}

export const Machine = React.createClass<Props, State>({
  render: function() {
    return (
      <div>
        <Link to={`/machines/${this.props.machine.name}`}>
          <i className='server icon'></i>
          <p>{this.props.machine.name}</p>
        </Link>
      </div>
    )
  }
});
