import * as React from 'react';
import {
  Form,
  InputField,
  SubmitButton,
  SubmitButtonControlMixin
} from '../shared/forms';
import { PullImageActionProps } from '../shared/props'

export default React.createClass<PullImageActionProps, any>({
  mixins: [SubmitButtonControlMixin],
  pull(data) {
    const { pullImage } = this.props;
    pullImage(data);
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
