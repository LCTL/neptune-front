import * as React from 'react';
import * as Reflux from 'reflux';
import { MachineContainerActions } from '../actions/machine-container-action';
import { MachineContainerIndexedStore } from '../stores/machine-container-store';
import { Button } from './button';

const Semantify = require('react-semantify');
const Link = require('react-router').Link

interface MachineContainerTableProps {
  machineName: string
}

interface MachineContainerTableBodyProps {
  containers: any[]
}

interface MachineContainerTableRowProps {
  key: string,
  container: any
}

const Header = React.createClass<any, any>({
  render: function() {
    return (
      <thead>
        <tr>
          <th>Names</th>
          <th>Image</th>
          <th>Command</th>
          <th>Status</th>
          <th>Ports</th>
        </tr>
      </thead>
    );
  }
});

const Row = React.createClass<MachineContainerTableRowProps, any>({
  render: function() {
    var container = this.props.container;
    var ports = [];
    var names = [];
    var port = '';
    var name = container.Names.map(name => name.substring(1)).join(', ');
    if (container.Ports) {
      ports = container.Ports.map(port => {
        var result = "";
        if (port.IP) {
          result += port.IP + ':';
        }
        if (port.PublicPort) {
          result += port.PublicPort + '->';
        }
        if (port.PrivatePort) {
          result += port.PrivatePort;
        }
        if (port.Type) {
          result += '/' + port.Type;
        }
        return result;
      });
      port = ports.join(', ')
    }
    return (
      <tr>
        <td>{name}</td>
        <td>{container.Image}</td>
        <td>{container.Command}</td>
        <td>{container.Status}</td>
        <td>{port}</td>
      </tr>
    )
  }
});

const Body = React.createClass<MachineContainerTableBodyProps, any>({
  render: function() {
    return (
      <tbody>
        {
          _.values(this.props.containers).map((container:any) => {
            return (
              <Row key={container.Id} container={container}/>
            )
          })
        }
      </tbody>
    );
  }
});

export const MachineContainerTable = React.createClass<MachineContainerTableProps, any>({
  mixins: [Reflux.connect(MachineContainerIndexedStore, 'machineContainer')],
  componentDidMount: function() {
    MachineContainerActions.loadList(this.props.machineName, {all: true});
  },
  render: function() {
    var machineName = this.props.machineName;
    var machineContainerMap = this.state.machineContainer;
    var containers = [];
    if (machineContainerMap[machineName]) {
      containers = machineContainerMap[machineName];
    }
    return (
      <Semantify.Table>
        <Header />
        <Body containers={containers} />
      </Semantify.Table>
    );
  }
});
