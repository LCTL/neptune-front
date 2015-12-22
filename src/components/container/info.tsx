import * as _ from 'lodash';
import * as React from 'react';

const { Table } = require('react-semantify')

interface RowProps {
  name: string,
  value: any
}

interface ContainerInfoProps {
  createHostUrl: (hostPort: string) => string,
  info: any
}

class Row extends React.Component<RowProps, any> {
  render() {
    const { name, value } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

class ContainerInfo extends React.Component<ContainerInfoProps, any> {
  arrayString(arr: any[], separator: string) {
    if (arr) {
      return arr.join(separator);
    }
    return '';
  }
  createPortBindings(info): any {
    const { createHostUrl } = this.props;
    if (info && info.NetworkSettings && info.NetworkSettings.Ports) {
      const bindings = info.NetworkSettings.Ports;
      return Object.keys(bindings).map(key => {
        const values: any[] = bindings[key];
        if (!values) {
          return;
        }
        return values.map(value => {
          var hostIpPort = value.HostIp;
          if (hostIpPort === '') {
            hostIpPort = '0.0.0.0'
          }
          hostIpPort += ':' + value.HostPort;
          return (
            <p>
              <a href={createHostUrl(value.HostPort)} target="_blank">
                {hostIpPort}->{key}
              </a>
            </p>
          )
        })
      });
    }
    return '';
  }
  render() {
    const { info } = this.props
    const portBindings = this.createPortBindings(info);
    return (
      <Table className="very basic definition">
        <tbody>
          <Row name="ID" value={info.Id} />
          <Row name="Status" value={info.State.Status} />
          <Row name="Name" value={info.Name.substring(1)} />
          <Row name="Image ID" value={info.Image} />
          <Row name="Image" value={info.Config.Image} />
          <Row name="Entrypoint" value={this.arrayString(info.Config.Entrypoint, ' ')} />
          <Row name="Command" value={this.arrayString(info.Config.Cmd, ' ')} />
          <Row name="Environment Variable" value={this.arrayString(info.Config.Env, ';')} />
          <Row name="Exposed Ports" value={this.arrayString(Object.keys(info.Config.ExposedPorts || {}), ', ')} />
          <Row name="Port Bindings" value={portBindings} />
          <Row name="Working Directory" value={info.Config.WorkingDir} />
          <Row name="Volumes" value={this.arrayString(Object.keys(info.Config.Volumes || {}), '; ')} />
          <Row name="Host Mapped Volumes" value={this.arrayString(info.HostConfig.Binds, ', ')} />
          <Row name="User" value={info.Config.User} />
        </tbody>
      </Table>
    )
  }
}

export default ContainerInfo;
