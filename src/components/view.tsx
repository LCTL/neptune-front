import * as React from 'react';
import * as Reflux from 'reflux';
import { RouteStore } from '../stores/route-store';
import { ActiveLink } from './shared/link';
import { Breadcrumb } from './Breadcrumb'
import { MachineTable } from './machine/table';
import { MachineCreationForm } from './machine/creation-form';
import { MachineDashboard as MachineDashboardComponent } from './machine/dashboard';
import { MachineContainerTable } from './container/table';
import { MachineContainerCreationForm } from './container/creation-form';
import { ToCreateContainerButton } from './container/button';
import {
  AutoSwitchStartStopMachineButton,
  RemoveMachineButton
} from './machine/button'
import { MachineProps } from './shared/props';

const reactSemantify = require('react-semantify');
const Link = require('react-router').Link;
const Divider = reactSemantify.Divider;
const Menu = reactSemantify.Menu;

interface TwoColumnProps {
  left: any,
  right: any,
  leftClassName?: string,
  rightClassName?: string
}

interface HeaderProps {
  icon?: string
}

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

const MachineDetailMenu = React.createClass<MachineProps, any>({
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

export const App = React.createClass<any, any>({
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

export const Machines = React.createClass<any, any>({
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

export const MachineCreation = React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Create Machine
        </HugeHeader>
        <Breadcrumb />
        <MachineCreationForm />
      </OneColumn>
    )
  }
});

export const MachineDetail = React.createClass<MachineProps, any>({
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

export const MachineDashboard = React.createClass<any, any>({
  render: function() {
    const machineName = this.props.params.machineName;
    return (
      <OneColumn>
        <OneColumn>
          <RemoveMachineButton className="labeled right floated" machineName={machineName}>
            Remove
          </RemoveMachineButton>
          <AutoSwitchStartStopMachineButton
            className="labeled right floated"
            machineName={machineName}
            stopChildren="Stop"
            startChildren="Start" />
        </OneColumn>
        <CenterCircularHeader icon="server">
          {machineName}
        </CenterCircularHeader>
        <MachineDashboardComponent machineName={this.props.params.machineName} />
      </OneColumn>
    );
  }
});

export const Containers = React.createClass<any, any>({
  render: function() {
    const machineName = this.props.params.machineName;
    return (
      <OneColumn>
        <OneColumn>
          <ToCreateContainerButton machineName={machineName} className="right floated" />
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

export const ContainerCreation = React.createClass<any, any>({
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
