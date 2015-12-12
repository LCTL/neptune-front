import * as React from 'react';
import { ActiveLink } from './links';
import { MachineProps } from './props';

const Semantify = require('react-semantify');

interface MachineDetailMenuProps extends MachineProps {
  router: any
}

export const TopMenu = React.createClass<any, any>({
  render: function(){
    return (
      <Semantify.Menu className="top secondary">
        <div className="header item">Neptune</div>
        <ActiveLink to="/" router={this.props.router}>Machine</ActiveLink>
      </Semantify.Menu>
    );
  }
});

export const MachineDetailMenu = React.createClass<MachineDetailMenuProps, any>({
  render: function(){
    var name = this.props.machineName;
    return (
      <Semantify.Menu className="secondary pointing">
        <ActiveLink to={`/machines/${name}`} router={this.props.router}>Dashboard</ActiveLink>
        <ActiveLink to={`/machines/${name}/containers`} router={this.props.router}>Containers</ActiveLink>
        <ActiveLink to={`/machines/${name}/images`} router={this.props.router}>Images</ActiveLink>
      </Semantify.Menu>
    );
  }
});
