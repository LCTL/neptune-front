import * as React from 'react';
import * as Reflux from 'reflux';
import { MachineActions } from '../actions/machine-action';
import { DockerActions } from '../actions/docker-action';
import { DockerInfoIndexedStore } from '../stores/docker-store';
import { MachineStatusIndexedStore } from '../stores/machine-store';
import { RouteStore } from '../stores/route-store';

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
  name: string
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

const ContainersStatistic = React.createClass<DockerProps, any>({
  render: function() {
    return (
      <Semantify.Statistic>
        <div className="value">
          {this.props.info.Containers}
        </div>
        <div className="label">
          Containers
        </div>
      </Semantify.Statistic>
    )
  }
});

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
        {this.props.name}
      </h2>
    )
  }
});

export const MachineDashboard = React.createClass<MachineDashBoardProps, any>({
  mixins: [
    Reflux.listenTo(MachineStatusIndexedStore, 'onMachineStateUpdate'),
    Reflux.connect(DockerInfoIndexedStore, 'dockerInfos')
  ],
  onMachineStateUpdate: function(map) {
    var status = map[this.state.machineName];
    if (status === 'Running') {
      DockerActions.loadInfo(this.state.machineName);
    }
    this.setState({
      machineStatus: status
    });
  },
  componentDidMount: function() {
    var machineName = this.props.machineName;
    if (machineName !== this.state.machineName) {
      MachineActions.loadStatus(machineName);
      MachineActions.inspect(machineName);
    }
    this.setState({
      machineName: machineName
    });
  },
  render: function() {
    var dockerInfo;
    var { machineName, dockerInfos } = this.state;
    if (dockerInfos[machineName]) {
      dockerInfo = dockerInfos[machineName];
    }
    return (
      <div>
        <Header name={machineName} />
        <Statistics info={dockerInfo} />
      </div>
    );
  }
});
