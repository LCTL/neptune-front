import * as React from 'react';
import { ActiveLink } from './links';
import { MachineProps } from './props';

const Semantify = require('react-semantify');

export const TopMenu = React.createClass<any, any>({
  render: function(){
    return (
      <Semantify.Menu className="top secondary">
        <div className="header item">Neptune</div>
        <ActiveLink to="/">Machine</ActiveLink>
      </Semantify.Menu>
    );
  }
});

export const MachineDetailMenu = React.createClass<MachineProps, any>({
  render: function(){
    var name = this.props.machineName;
    return (
      <Semantify.Menu className="secondary pointing">
        <ActiveLink to={`/machines/${name}`}>Dashboard</ActiveLink>
        <ActiveLink to={`/machines/${name}/containers`}>Containers</ActiveLink>
        <ActiveLink to={`/machines/${name}/images`}>Images</ActiveLink>
      </Semantify.Menu>
    );
  }
});
