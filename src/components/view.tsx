import * as React from 'react';
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
import { connect } from 'react-redux';
import { fetchList, fetchStatus } from '../actions/machine-action';
import { fetchDockerInfo } from '../actions/docker-action';
import { fetchMachineContainerList } from '../actions/container-action';

const reactSemantify = require('react-semantify');
const Link = require('react-router').Link;
const Divider = reactSemantify.Divider;
const Menu = reactSemantify.Menu;

const DashboardProps = (state) => ({
  statuses: state.machine.statusesByName,
  dockerInfos: state.docker.infosByName
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

const MachinesReloader = connect((state => ({operating: state.machine.operating})))(React.createClass<any, any>({
  render: function() {
    this.props.dispatch(fetchList());
    return (
      <span />
    )
  }
}));

export const Machines = connect((state => ({machines: state.machine.machinesByName})))(React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <MachinesReloader />
        <HugeHeader icon="server">
          Machines
        </HugeHeader>
        <Breadcrumb />
        <MachineTable machines={this.props.machines} />
      </OneColumn>
    )
  }
}));

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

const MachineReloader = connect((state => ({operating: state.machine.operating})))(React.createClass<any, any>({
  render: function() {
    this.props.dispatch(fetchStatus(this.props.machineName));
    this.props.dispatch(fetchDockerInfo(this.props.machineName));
    return (
      <span />
    )
  }
}));

export const MachineDashboard = connect(DashboardProps)(React.createClass<any, any>({
  render: function() {
    const machineName = this.props.params.machineName;
    const status = this.props.statuses[machineName];
    var dockerInfo;
    if (status === 'Running'){
       dockerInfo = this.props.dockerInfos[machineName];
    }
    return (
      <OneColumn>
        <MachineReloader machineName={machineName} />
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
        <MachineDashboardComponent machineName={this.props.params.machineName} status={status} dockerInfo={dockerInfo} />
      </OneColumn>
    );
  }
}));

export const Containers = connect(state => ({containersByName: state.container.containersByMachineName}))(React.createClass<any, any>({
  componentWillMount: function() {
    const machineName = this.props.params.machineName;
    this.props.dispatch(fetchMachineContainerList(machineName, {all: true}));
  },
  render: function() {
    const machineName = this.props.params.machineName;
    const { containersByName } = this.props;
    return (
      <OneColumn>
        <OneColumn>
          <ToCreateContainerButton machineName={machineName} className="right floated" />
        </OneColumn>
        <CenterCircularHeader icon="grid">
          Containers
        </CenterCircularHeader>
        <br />
        <MachineContainerTable machineName={machineName} containers={containersByName[machineName]} />
      </OneColumn>
    );
  }
}));

export const ContainerCreation = connect()(React.createClass<any, any>({
  render: function() {
    return (
      <OneColumn>
        <CenterCircularHeader icon="grid layout">
          Create Container
        </CenterCircularHeader>
        <MachineContainerCreationForm machineName={this.props.params.machineName} dispatch={this.props.dispatch} />
      </OneColumn>
    )
  }
}));
