import * as React from 'react';
import { ActiveLink } from './links';
import { MachineProps } from './props';

const Semantify = require('react-semantify');
const { Link } = require('react-router');

interface MachineDetailMenuProps extends MachineProps {
  router: any
}

export const TopMenu = React.createClass<any, any>({
  render: function(){
    return (
      <Semantify.Menu className="top secondary">
        <div className="header item">
          <Link to="/">Neptune</Link>
        </div>
        <ActiveLink to="/machines" router={this.props.router}>Machines</ActiveLink>
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
