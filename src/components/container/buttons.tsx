import * as React from 'react';
import { Button } from '../shared/buttons';
import { MachineStyleableProps } from '../shared/props'

interface ToCreateContainerButtonProps extends MachineStyleableProps {
  history: any
}

export const ToCreateContainerButton = React.createClass<ToCreateContainerButtonProps, any>({
  go: function() {
    const { machineName, history } = this.props;
    history.push(`/machines/${machineName}/create-container`);
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
