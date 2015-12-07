import * as React from 'react';
import * as Reflux from 'reflux';
import { Button } from './button';

const Link = require('react-router').Link

interface LinkToCreateContainerButtonProps {
  machineName: string,
  className?: string
}

export const LinkToCreateContainerButton = React.createClass<any, any>({
  render: function() {
    return (
      <Link to={`/machines/${this.props.machineName}/create-container`}>
        <Button className={`primary labeled icon ${this.props.className}`}>
          <i className='plus icon'></i>
          Create Container
        </Button>
      </Link>
    );
  }
});
