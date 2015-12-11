import * as React from 'react';
import { Button } from '../shared/button';
import { MachineStyleableProps } from '../shared/props'
const { History } = require('react-router');

export const ToCreateContainerButton = React.createClass<MachineStyleableProps, any>({
  mixins: [History],
  go: function() {
    this.history.push(`/machines/${this.props.machineName}/create-container`);
  },
  render: function() {
    return (
      <Button className={`primary labeled icon ${this.props.className}`} onClick={this.go}>
        <i className='plus icon'></i>
        Create Container
      </Button>
    );
  }
});
