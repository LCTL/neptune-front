import * as moment from 'moment';
import * as React from 'react';
import * as DateUtils from '../../utils/data-utils';
import { CommonProps, MachineIpProps } from '../shared/props'
import { Button } from '../shared/buttons';
import {
  StartMachineContainerActionProps,
  StopMachineContainerActionProps,
  RemoveMachineContainerActionProps
} from '../shared/props';
import { AutoSwitchStartStopButton, RemoveContainerButton } from './buttons';

const Semantify = require('react-semantify');
const Link = require('react-router').Link

interface MachineContainerTable extends
  MachineIpProps,
  StartMachineContainerActionProps,
  StopMachineContainerActionProps,
  RemoveMachineContainerActionProps {
  containers: any[]
}

interface MachineContainerTableRowProps extends
  MachineIpProps,
  StartMachineContainerActionProps,
  StopMachineContainerActionProps,
  RemoveMachineContainerActionProps {
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
          <th>Created</th>
          <th className="collapsing"></th>
        </tr>
      </thead>
    );
  }
});

const Row = React.createClass<MachineContainerTableRowProps, any>({
  render: function() {
    const {
      machineName,
      machineIp,
      container,
      startMachineContainer,
      stopMachineContainer,
      removeMachineContainer
    } = this.props;
    var ports = [];
    var names = [];
    var name = container.Names.map(name => name.substring(1)).join(', ');
    var removeButton = <noscript />;
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

        if (port.PublicPort) {
          return (
            <p>
              <a href={`http://${machineIp}:${port.PublicPort}`} target="_blank">
                {result}
              </a>
            </p>
          );
        } else {
          return (
            <p>{result}</p>
          );
        }

      });
    }

    if (!/up/i.test(container.Status)){
      removeButton = (
        <RemoveContainerButton
          className="tiny compact"
          machineName={machineName}
          containerId={container.Id}
          removeMachineContainer={removeMachineContainer} />
      );
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
        <td>
          <Link to={`/machines/${machineName}/containers/${container.Id}`}>
            {name}
          </Link>
        </td>
        <td>{container.Image}</td>
        <td>{container.Command}</td>
        <td>{container.Status}</td>
        <td>{ports}</td>
        <td>{moment(DateUtils.dockerTimestampToJsTimestamp(container.Created)).fromNow()}</td>
        <td className="collapsing">
          {removeButton}
        </td>
      </tr>
    )
  }
});

const Body = React.createClass<MachineContainerTable, any>({
  render: function() {
    const {
      machineName,
      machineIp,
      containers,
      startMachineContainer,
      stopMachineContainer,
      removeMachineContainer
    } = this.props;
    return (
      <tbody>
        {
          _.values(containers).map((container:any) => {
            return (
              <Row key={container.Id}
                machineName={machineName}
                container={container}
                machineIp={machineIp}
                startMachineContainer={startMachineContainer}
                stopMachineContainer={stopMachineContainer}
                removeMachineContainer={removeMachineContainer} />
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
      machineIp,
      containers,
      startMachineContainer,
      stopMachineContainer,
      removeMachineContainer
    } = this.props;
    return (
      <Semantify.Table>
        <Header />
        <Body
          containers={containers}
          machineName={machineName}
          machineIp={machineIp}
          startMachineContainer={startMachineContainer}
          stopMachineContainer={stopMachineContainer}
          removeMachineContainer={removeMachineContainer} />
      </Semantify.Table>
    );
  }
});
