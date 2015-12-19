import * as moment from 'moment';
import * as React from 'react';
import * as DateUtils from '../../utils/data-utils';
import { CommonProps, MachineIpProps } from '../shared/props'
import { Button } from '../shared/buttons';
import {
  StartContainerActionProps,
  StopContainerActionProps,
  RemoveContainerActionProps,
  CreateContainerHostUrlActionProps,
  CreateContainerDetailPathActionProps
} from '../shared/props';
import { AutoSwitchStartStopButton, RemoveContainerButton } from './buttons';

const Semantify = require('react-semantify');
const Link = require('react-router').Link

interface ContainerTable extends
  CreateContainerHostUrlActionProps,
  CreateContainerDetailPathActionProps,
  StartContainerActionProps,
  StopContainerActionProps,
  RemoveContainerActionProps {
  containers: any[]
}

interface ContainerTableRowProps extends
  CreateContainerHostUrlActionProps,
  CreateContainerDetailPathActionProps,
  StartContainerActionProps,
  StopContainerActionProps,
  RemoveContainerActionProps {
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

const Row = React.createClass<ContainerTableRowProps, any>({
  render: function() {
    const {
      machineName,
      machineIp,
      container,
      startContainer,
      stopContainer,
      removeContainer,
      createHostUrl,
      createContainerDetailPath
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
              <a href={createHostUrl(port.PublicPort)} target="_blank">
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
          containerId={container.Id}
          removeContainer={removeContainer} />
      );
    }

    return (
      <tr>
        <td className="collapsing">
          <AutoSwitchStartStopButton
            className="tiny compact"
            containerStatus={container.Status}
            containerId={container.Id}
            startContainer={startContainer}
            stopContainer={stopContainer} />
        </td>
        <td>
          <Link to={createContainerDetailPath(container.Id)}>
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

const Body = React.createClass<ContainerTable, any>({
  render: function() {
    const {
      containers,
      startContainer,
      stopContainer,
      removeContainer,
      createHostUrl,
      createContainerDetailPath
    } = this.props;
    return (
      <tbody>
        {
          _.values(containers).map((container:any) => {
            return (
              <Row key={container.Id}
                container={container}
                startContainer={startContainer}
                stopContainer={stopContainer}
                removeContainer={removeContainer}
                createHostUrl={createHostUrl}
                createContainerDetailPath={createContainerDetailPath} />
            )
          })
        }
      </tbody>
    );
  }
});

export default React.createClass<ContainerTable, any>({
  render: function() {
    return (
      <Semantify.Table>
        <Header />
        <Body {...this.props} />
      </Semantify.Table>
    );
  }
});
