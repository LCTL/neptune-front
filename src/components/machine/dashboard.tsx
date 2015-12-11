import * as React from 'react';
import { connect } from 'react-redux';
import {
  AutoSwitchStartStopMachineButton,
  RemoveMachineButton
} from './button'
import { MachineProps } from '../shared/props'

const History = require('react-router').History;
const Semantify = require('react-semantify');
const prettysize = require('prettysize');

const DashboardProps = (state) => ({
  statuses: state.machineStatusesByName,
  operating: state.machineOperating
});

interface DockerProps {
  info: any
}

interface StatisticProps {
  label: string,
  value: string
}

interface HeaderButtonGroupProps extends MachineProps {
  state: string
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

const Header = React.createClass<MachineProps, any>({
  render: function() {
    return (
      <h2 className="ui center aligned icon header">
        <i className="circular server icon"></i>
        {this.props.machineName}
      </h2>
    )
  }
});

export const MachineDashboard = connect(DashboardProps)(React.createClass<any, any>({
  render: function() {
    const { machineName, dockerInfo } = this.props
    return (
      <Statistics info={dockerInfo} />
    );
  }
}));
