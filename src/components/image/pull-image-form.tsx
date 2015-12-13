import * as React from 'react';
import {
  Form,
  InputField,
  SubmitButton,
  SubmitButtonControlMixin
} from '../shared/forms';
import { MachineProps } from '../shared/props'

interface PullFormProps extends MachineProps {
  createMachineImage: (machineName: string, options: any) => void
}

export default React.createClass<PullFormProps, any>({
  mixins: [SubmitButtonControlMixin],
  pull(data) {
    const { machineName, createMachineImage } = this.props;
    createMachineImage(machineName, data);
  },
  render() {
    return (
      <Form onValidSubmit={this.pull} onValid={this.enableButton} onInvalid={this.disableButton}>
        <div className="two fields">
          <InputField
            name="fromImage"
            label="Image Name"
            required />
          <InputField
            name="tag"
            label="Tag" />
        </div>
        <SubmitButton className="green fluid" disabled={this.state.disableSubmit} text="Pull" />
      </Form>
    )
  }
});
