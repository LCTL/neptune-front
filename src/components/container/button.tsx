import * as React from 'react';
import * as Reflux from 'reflux';
import { HistoryActions } from '../../actions/history-action';
import { Button } from '../shared/button';
import { MachineStyleableProps } from '../shared/common-props'

export const ToCreateContainerButton = React.createClass<MachineStyleableProps, any>({
  go: function() {
    HistoryActions.push(`/machines/${this.props.machineName}/create-container`);
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
