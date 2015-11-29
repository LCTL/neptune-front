import * as React from 'react';
import * as Reflux from 'reflux';
import { RouteStore } from '../stores/route-store';
import { MachineTable } from '../components/machine-table';
import { CreateMachineForm } from '../components/create-machine-form';

const Link = require('react-router').Link;

interface ActiveLinkProps {
  to: string,
  route: any
}

const ActiveLink = React.createClass<ActiveLinkProps, any>({
  render: function(){
    var path:string = _.get(this.props.route, 'location.pathname', '');
    var active:string = path === this.props.to ? 'active' : '';
    return (
      <Link className={`item ${active}`} to={this.props.to}>
        {this.props.children}
      </Link>
    );
  }
});

const TopMenu = React.createClass<any, any>({
  mixins: [Reflux.connect(RouteStore, 'route')],
  render: function(){
    return (
      <div className="ui secondary menu">
        <div className="header item">DMM</div>
        <ActiveLink route={this.state.route} to="/">Machine</ActiveLink>
      </div>
    );
  }
});

const OneColumn = React.createClass<any, any>({
  render: function(){
    return (
      <div className="ui grid">
        <div className="column">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export const AppContainer = React.createClass<any, any>({
  render: function() {
    return (
      <div className="ui container">
        <br />
        <TopMenu />
        <div className="ui divider" />
        <br />
        {this.props.children}
      </div>
    );
  }
});

export const MachineContainer = React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <MachineTable />
      </OneColumn>
    )
  }
});

export const CreateMachineFormContainer = React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <CreateMachineForm />
      </OneColumn>
    )
  }
});
