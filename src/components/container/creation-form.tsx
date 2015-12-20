import * as _ from 'lodash';
import * as React from 'react';
import { AutoCompleteResult } from '../../constants/interfaces';
import {
  Form,
  InputField,
  AutoCompleteInputField,
  MultipleValueInputTextField,
  SubmitButton,
  SubmitButtonControlMixin
} from '../shared/forms';
import { CreateContainerActionProps } from '../shared/props'

interface CreationFormProps extends CreateContainerActionProps {
  autoCompleteImages: AutoCompleteResult[]
}

export default React.createClass<CreationFormProps, any>({
  mixins: [
    SubmitButtonControlMixin,
  ],
  create: function(data) {
    const { history, createContainer } = this.props;
    data = _(data)
      .omit(_.isUndefined)
      .omit(_.isNull)
      .omit((v) => v === '')
      .omit((v) => Object.keys(v).length === 0)
      .value();

    if (data.Cmd) {
      data.Cmd = data.Cmd.split(' ');
    }

    if (data.Entrypoint) {
      data.Cmd = data.Entrypoint.split(' ');
    }

    if (data.ExposedPorts) {
      let ports = {};
      data.ExposedPorts.forEach(port => ports[port] = {});
      data.ExposedPorts = ports;
    }

    if (data.HostConfig && data.HostConfig.PortBindings) {
      let bindinngs = {};
      data.HostConfig.PortBindings.forEach(bindingPort => {
        const temp = bindingPort.split(':');
        if (temp.length === 2) {
          let hostPort = temp[0];
          let containerPort = temp[1];
          bindinngs[containerPort] = [{"HostPort": hostPort}];
        }
      })
      data.HostConfig.PortBindings = bindinngs;
    }

    if (data.HostConfig && data.HostConfig.Binds) {
      let binds = data.HostConfig.Binds.filter(value => _.includes(value, ':'));
      let volumes = data.HostConfig.Binds.filter(value => !_.includes(value, ':'));
      data.HostConfig.Binds = binds;
      // https://github.com/docker/docker/issues/15908
      // 'volumes' key is undocumented in the API docs.
      if (!_.isEmpty(volumes)) {
        data.Volumes = {}
        volumes.forEach(volume => data.Volumes[volume] = {});
      }
    }

    createContainer(data);
  },
  render: function() {
    return (
      <Form onValidSubmit={this.create} onValid={this.enableButton} onInvalid={this.disableButton}>
        <div className="two fields">
          <AutoCompleteInputField
            name="Image"
            label="Image"
            source={this.props.autoCompleteImages}
            placeholder="A string specifying the image name to use for the container"
            required />
          <InputField
            name="name"
            label="Name"
            placeholder="Assign the specified name to the container" />
        </div>
        <div className="two fields">
          <InputField
            name="Entrypoint"
            label="Entrypoint"
            placeholder="Set the entry point for the container as a string" />
          <InputField
            name="Cmd"
            label="Cmd"
            placeholder="Command to run specified as a string or an array of strings" />
        </div>
        <div className="two fields">
          <MultipleValueInputTextField
            name="ExposedPorts"
            label="Exposed Ports (<port>/<tcp|udp>)"
            placeholder="Container exposed ports" />
          <MultipleValueInputTextField
            name="HostConfig.PortBindings"
            label="Port Bindings (<host_port>:<container_exposed_port>/<protocol>)"
            placeholder="A map of exposed container ports and the host port they should map to" />
        </div>
        <MultipleValueInputTextField
          name="Env"
          label="Environment variables (VAR=value)"
          placeholder="A list of environment variables" />
        <InputField
          name="WorkingDir"
          label="Working Directory"
          placeholder="A string specifying the working directory for commands to run in" />
        <MultipleValueInputTextField
          name="HostConfig.Binds"
          label="Binds Volume (container_path, host_path:container_path, host_path:container_path:ro)"
          placeholder="A list of volume bindings for this container" />
        <SubmitButton className="green" disabled={this.state.disableSubmit} text="Create" />
      </Form>
    )
  }
});
