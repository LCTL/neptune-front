import * as React from 'react';
import * as Reflux from 'reflux';
import { RouteStore } from '../stores/route-store';
import { ActiveLink } from './shared/link';
import { HugeHeader, CenterCircularHeader } from './shared/header';
import { OneColumn } from './shared/grid';
import { Breadcrumb } from './shared/breadcrumb'
import { TopMenu, MachineDetailMenu } from './shared/menu'
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
