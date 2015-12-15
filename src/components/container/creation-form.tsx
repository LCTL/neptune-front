import * as React from 'react';
import { AutoCompleteResult } from '../../constants/interfaces';
import {
  Form,
  InputField,
  AutoCompleteInputField,
  SubmitButton,
  SubmitButtonControlMixin
} from '../shared/forms';
import { MachineProps } from '../shared/props'

interface CreationFormProps extends MachineProps {
  autoCompleteImages: AutoCompleteResult[],
  createMachineContainer: (machineName: string) => void
}

export default React.createClass<CreationFormProps, any>({
  mixins: [
    SubmitButtonControlMixin,
  ],
  create: function(data) {
    const { machineName, createMachineContainer } = this.props;
    createMachineContainer(machineName, data);
  },
  render: function() {
    return (
      <Form onValidSubmit={this.create} onValid={this.enableButton} onInvalid={this.disableButton}>
        <div className="two fields">
          <AutoCompleteInputField
            name="Image"
            label="Image"
            source={this.props.autoCompleteImages}
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
