import * as React from 'react';
import { CommonProps, MachineProps } from '../shared/props'
import { Button } from '../shared/buttons';
import { StartMachineContainerActionProps, StopMachineContainerActionProps } from '../shared/props';
import { AutoSwitchStartStopButton } from './buttons';

const Semantify = require('react-semantify');
const Link = require('react-router').Link

interface MachineContainerTable extends
  MachineProps, StartMachineContainerActionProps, StopMachineContainerActionProps {
  containers: any[]
}

interface MachineContainerTableRowProps extends
  MachineProps, StartMachineContainerActionProps, StopMachineContainerActionProps {
  container: any
}

const Header = React.createClass<any, any>({
  render: function() {
    return (
      <thead>
        <tr>
          <th className="collapsing"></th>
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
    const { machineName, container, startMachineContainer, stopMachineContainer } = this.props;
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
        <td className="collapsing">
          <AutoSwitchStartStopButton
            className="tiny compact"
            machineName={machineName}
            containerStatus={container.Status}
            containerId={container.Id}
            startMachineContainer={startMachineContainer}
            stopMachineContainer={stopMachineContainer} />
        </td>
        <td>{name}</td>
        <td>{container.Image}</td>
        <td>{container.Command}</td>
        <td>{container.Status}</td>
        <td>{port}</td>
      </tr>
    )
  }
});

const Body = React.createClass<MachineContainerTable, any>({
  render: function() {
    const {
      machineName,
      containers,
      startMachineContainer,
      stopMachineContainer
    } = this.props;
    return (
      <tbody>
        {
          _.values(containers).map((container:any) => {
            return (
              <Row key={container.Id}
                machineName={machineName}
                container={container}
                startMachineContainer={startMachineContainer}
                stopMachineContainer={stopMachineContainer} />
            )
          })
        }
      </tbody>
    );
  }
});

export default React.createClass<MachineContainerTable, any>({
  render: function() {
    const {
      machineName,
      containers,
      startMachineContainer,
      stopMachineContainer
    } = this.props;
    return (
      <Semantify.Table>
        <Header />
        <Body
          containers={containers}
          machineName={machineName}
          startMachineContainer={startMachineContainer}
          stopMachineContainer={stopMachineContainer} />
      </Semantify.Table>
    );
  }
});
