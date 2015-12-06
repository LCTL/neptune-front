import * as React from 'react';
import * as Reflux from 'reflux';
import { MachineActions } from '../actions/machine-action';
import { DockerActions } from '../actions/docker-action';
import { DockerInfoIndexedStore } from '../stores/docker-store';
import {
  MachineStatusIndexedStore,
  MachineNameOperatingStore,
  MachineNameOperatingDetailStore
} from '../stores/machine-store';
import {
  AutoSwitchStartStopMachineButton,
  RemoveMachineButton
} from './machine-control-button'

const History = require('react-router').History;
const Semantify = require('react-semantify');
const prettysize = require('prettysize');

interface DockerProps {
  info: any
}

interface StatisticProps {
  label: string,
  value: string
}

interface HeaderProps {
  machineName: string
}

interface HeaderButtonGroupProps extends HeaderProps {
  state: string
}

interface MachineDashBoardProps {
  machineName: string
}

const Statistic = React.createClass<StatisticProps, any>({
  render: function() {
    var value = this.props.value;
    return (
      <Semantify.Statistic>
        <div className="value">
          {value === undefined ? '-' : value}
        </div>
        <div className="label">
          {this.props.label}
        </div>
      </Semantify.Statistic>
    )
  }
})

const Statistics = React.createClass<DockerProps, any>({
  render: function() {
    var { info } = this.props
    var cpu, memory, containers, images;
    if (info) {
      cpu = info.NCPU;
      memory = prettysize(info.MemTotal);
      containers = info.Containers;
      images = info.Images;
    } else{
      cpu = memory = containers = images = undefined;
    }
    return (
      <div>
        <div className="ui two statistics">
          <Statistic label="CPU" value={cpu} />
          <Statistic label="Total Memory" value={memory} />
        </div>
        <div className="ui divider" />
        <div className="ui two statistics">
          <Statistic label="Containers" value={containers} />
          <Statistic label="Images" value={images} />
        </div>
      </div>
    );
  }
});

const Header = React.createClass<HeaderProps, any>({
  render: function() {
    return (
      <h2 className="ui center aligned icon header">
        <i className="circular server icon"></i>
        {this.props.machineName}
      </h2>
    )
  }
});

const HeaderButtonGroup = React.createClass<HeaderButtonGroupProps, any>({
  render: function() {
    const machineName = this.props.machineName;
    return (
      <div className="ui grid">
        <div className="four column row">
          <div className="right floated column">
            <AutoSwitchStartStopMachineButton
              className="right labeled"
              state={this.props.state}
              machineName={machineName}
              stopChildren="Stop"
              startChildren="Start" />
            <RemoveMachineButton className="right labeled" machineName={machineName}>
              Remove
            </RemoveMachineButton>
          </div>
        </div>
      </div>
    )
  }
});

export const MachineDashboard = React.createClass<MachineDashBoardProps, any>({
  mixins: [
    History,
    Reflux.connect(DockerInfoIndexedStore, 'dockerInfos'),
    Reflux.listenTo(MachineStatusIndexedStore, 'onMachineStateUpdate'),
    Reflux.listenTo(MachineNameOperatingStore, 'reload'),
    Reflux.listenTo(MachineNameOperatingDetailStore, 'onRemove')
  ],
  onMachineStateUpdate: function(map) {
    const machineName = this.props.machineName;
    var status = map[machineName];
    if (status === 'Running') {
      DockerActions.loadInfo(machineName);
    }
    this.setState({
      machineStatus: status,
      dockerInfos: {}
    });
  },
  onRemove: function(operating) {
    if (_.includes(operating.remove, this.props.machineName)){
      this.history.pushState(null, '/machines');
    }
  },
  reload: function() {
    var machineName = this.props.machineName;
    MachineActions.loadStatus(machineName);
    MachineActions.inspect(machineName);
  },
  componentDidMount: function() {
    this.reload();
  },
  render: function() {
    const { dockerInfos } = this.state;
    const { machineName } = this.props
    var dockerInfo;
    if (dockerInfos[machineName]) {
      dockerInfo = dockerInfos[machineName];
    }
    return (
      <div>
        <HeaderButtonGroup machineName={machineName} state={this.state.machineStatus} />
        <Header machineName={machineName} />
        <Statistics info={dockerInfo} />
      </div>
    );
  }
});
