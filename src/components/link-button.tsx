import * as React from 'react';
import * as Reflux from 'reflux';
import { HistoryActions } from '../actions/route-action';
import { Button } from './button';

const Link = require('react-router').Link

interface LinkToCreateContainerButtonProps {
  machineName: string,
  className?: string
}

export const LinkToCreateContainerButton = React.createClass<any, any>({
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
