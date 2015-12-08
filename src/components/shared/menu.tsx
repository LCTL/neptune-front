import * as React from 'react';
import * as Reflux from 'reflux';
import { RouteStore } from '../../stores/route-store';
import { ActiveLink } from './link';
import { MachineProps } from './props';

const Semantify = require('react-semantify');

export const TopMenu = React.createClass<any, any>({
  mixins: [Reflux.connect(RouteStore, 'route')],
  render: function(){
    return (
      <Semantify.Menu className="top secondary">
        <div className="header item">Neptune</div>
        <ActiveLink route={this.state.route} to="/">Machine</ActiveLink>
      </Semantify.Menu>
    );
  }
});

export const MachineDetailMenu = React.createClass<MachineProps, any>({
  mixins: [Reflux.connect(RouteStore, 'route')],
  render: function(){
    var name = this.props.machineName;
    return (
      <Semantify.Menu className="secondary pointing">
        <ActiveLink route={this.state.route} to={`/machines/${name}`}>Dashboard</ActiveLink>
        <ActiveLink route={this.state.route} to={`/machines/${name}/containers`}>Containers</ActiveLink>
        <ActiveLink route={this.state.route} to={`/machines/${name}/images`}>Images</ActiveLink>
      </Semantify.Menu>
    );
  }
});
