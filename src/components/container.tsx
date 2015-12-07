import * as React from 'react';
import * as Reflux from 'reflux';
import { RouteStore } from '../stores/route-store';
import { Breadcrumb } from './Breadcrumb'
import { MachineTable } from './machine-table';
import { CreateMachineForm } from './create-machine-form';
import { MachineDashboard } from './machine-dashboard';
import { MachineContainerTable } from './machine-container-table';
import { MachineContainerCreationForm } from './machine-container-creation-form';

import { LinkToCreateContainerButton } from './link-button';

const reactSemantify = require('react-semantify');
const Link = require('react-router').Link;
const Divider = reactSemantify.Divider;
const Menu = reactSemantify.Menu;

interface ActiveLinkProps {
  to: string,
  route: any
}

interface TwoColumnProps {
  left: any,
  right: any,
  leftClassName?: string,
  rightClassName?: string
}

interface HeaderProps {
  icon?: string
}

interface MachineDetailProps {
  machineName: string
}

interface MachineLeftMenu extends MachineDetailProps {
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
      <Menu className="top secondary">
        <div className="header item">Neptune</div>
        <ActiveLink route={this.state.route} to="/">Machine</ActiveLink>
      </Menu>
    );
  }
});

const MachineDetailMenu = React.createClass<MachineLeftMenu, any>({
  mixins: [Reflux.connect(RouteStore, 'route')],
  render: function(){
    var name = this.props.machineName;
    return (
      <Menu className="secondary pointing">
        <ActiveLink route={this.state.route} to={`/machines/${name}`}>Dashboard</ActiveLink>
        <ActiveLink route={this.state.route} to={`/machines/${name}/containers`}>Containers</ActiveLink>
        <ActiveLink route={this.state.route} to={`/machines/${name}/images`}>Images</ActiveLink>
      </Menu>
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

const TwoColumn = React.createClass<any, any>({
  render: function(){
    var { left, right, leftClassName, rightClassName } = this.props
    if (!leftClassName) {
      leftClassName = 'four';
    }
    if (!rightClassName) {
      rightClassName = 'twelve'
    }
    return (
      <div className="ui grid">
        <div className={`${leftClassName} wide column`}>
          {left}
        </div>
        <div className={`${rightClassName} wide column`}>
          {right}
        </div>
      </div>
    );
  }
});

const HugeHeader = React.createClass<HeaderProps, any>({
  render: function() {
    var icon = this.props.icon ? this.props.icon : '';
    return (
      <div className="ui huge header">
        <i className={`${icon} icon`}></i>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
});

const CenterCircularHeader = React.createClass<HeaderProps, any>({
  render: function() {
    var icon = this.props.icon ? this.props.icon : '';
    return (
      <h2 className="ui center aligned icon header">
        <i className={`${icon} circular layout icon`}></i>
        {this.props.children}
      </h2>
    )
  }
})

export const AppContainer = React.createClass<any, any>({
  render: function() {
    return (
      <div className="ui container">
        <TopMenu />
        <Divider className="bottom-space" />
        {this.props.children}
      </div>
    );
  }
});

export const MachineContainer = React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Machines
        </HugeHeader>
        <Breadcrumb />
        <MachineTable />
      </OneColumn>
    )
  }
});

export const CreateMachineFormContainer = React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Create Machine
        </HugeHeader>
        <Breadcrumb />
        <CreateMachineForm />
      </OneColumn>
    )
  }
});

export const MachineDetailContainer = React.createClass<MachineDetailProps, any>({
  render: function() {
    var machineName = this.props.params.machineName;
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Machine: {machineName}
        </HugeHeader>
        <Breadcrumb />
        <MachineDetailMenu machineName={machineName} />
        {this.props.children}
      </OneColumn>
    );
  }
});

export const MachineDashboardContainer = React.createClass<any, any>({
  render: function() {
    return (
      <MachineDashboard machineName={this.props.params.machineName} />
    );
  }
});

export const MachineContainerTableContainer = React.createClass<any, any>({
  render: function() {
    const machineName = this.props.params.machineName;
    return (
      <OneColumn>
        <OneColumn>
          <LinkToCreateContainerButton machineName={machineName} className="right floated" />
        </OneColumn>
        <CenterCircularHeader icon="grid">
          Containers
        </CenterCircularHeader>
        <br />
        <MachineContainerTable machineName={machineName} />
      </OneColumn>
    );
  }
});

export const MachineContainerCreationFormContraine = React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <CenterCircularHeader icon="grid layout">
          Create Container
        </CenterCircularHeader>
        <MachineContainerCreationForm machineName={this.props.params.machineName} />
      </OneColumn>
    )
  }
});
