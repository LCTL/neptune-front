import * as React from 'react';
import * as Reflux from 'reflux';
import { MachineContainerActions } from '../actions/machine-container-action';
import {
  Form,
  InputField,
  SubmitButton,
  SubmitButtonControlMixin
} from './form';

interface MachineContainerCreationFormProps {
  machineName: string
}

export const MachineContainerCreationForm = React.createClass<MachineContainerCreationFormProps, any>({
  mixins: [
    SubmitButtonControlMixin,
  ],
  create: function(data) {
    MachineContainerActions.create(this.props.machineName, data);
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
            name="Name"
            label="Name" />
        </div>
        <SubmitButton className="green" disabled={this.state.disableSubmit} text="Create" />
      </Form>
    )
  }
});
