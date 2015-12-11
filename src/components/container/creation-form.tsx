import * as React from 'react';
import { createMachineContainer } from '../../actions/container-actions';
import {
  Form,
  InputField,
  SubmitButton,
  SubmitButtonControlMixin
} from '../shared/forms';
import { MachineProps } from '../shared/props'

export default React.createClass<any, any>({
  mixins: [
    SubmitButtonControlMixin,
  ],
  create: function(data) {
    this.props.dispatch(createMachineContainer(this.props.machineName, data));
  },
  render: function() {
    return (
      <Form onValidSubmit={this.create} onValid={this.enableButton} onInvalid={this.disableButton}>
        <div className="two fields">
          <InputField
            name="Image"
            label="Image"
            required />
          <InputField
            name="name"
            label="Name" />
        </div>
        <SubmitButton className="green" disabled={this.state.disableSubmit} text="Create" />
      </Form>
    )
  }
});
