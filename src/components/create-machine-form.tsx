import * as _ from 'lodash';
import * as React from 'react';
import * as Reflux from 'reflux';
import { DriverActions } from '../actions/driver-action'
import { MachineActions } from '../actions/machine-action'
import { MachineNameOperatingStore } from '../stores/machine-store';
import { DriversStore, SelectedDriverStore } from '../stores/driver-store'
import {
  Form,
  Field,
  InputField,
  HiddenField,
  SubmitButton,
  SubmitButtonControlMixin
} from './form';
import {
  MachineActionLoadingMixin,
  MachineOperationMixin
} from './mixin/machine-mixin';

const History = require('react-router').History;
const reactSemantify = require('react-semantify');
const Dropdown = reactSemantify.Dropdown;
const Divider = reactSemantify.Divider;

const MachineFormMixin = {
  getInitialState: function() {
    return {
      submitLoading: false
    };
  },
  create: function(data) {
    this.setState({
      machineName: data.name
    });
    MachineActions.create(data.name, data.driver, data.swarm);
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (this.state.operating === true && nextState.operating === false) {
      this.history.pushState(null, '/');
    }
  }
}

export const VirtualBoxForm = React.createClass<any, any>({
  mixins: [
    History,
    SubmitButtonControlMixin,
    MachineFormMixin,
    MachineActionLoadingMixin('create'),
    MachineOperationMixin
  ],
  render: function() {
    return (
      <Form className={this.state.loading ? 'loading' : ''} onValidSubmit={this.create} onValid={this.enableButton} onInvalid={this.disableButton}>
        <HiddenField name="driver.name" value="virtualbox" />
        <InputField
          name="name"
          label="Machine Name"
          required />
        <InputField
          type="number"
          name="driver.options.virtualbox-memory"
          label="Memory"
          value="512" />
        <SubmitButton className="green" disabled={this.state.disableSubmit || this.state.operating} loading={this.state.loading} text="Create" />
      </Form>
    );
  }
});

const DriverFormMap = {
  'virtualbox': VirtualBoxForm
}

export const DriverSelection = React.createClass<any, any>({
  mixins: [Reflux.connect(DriversStore, 'drivers')],
  componentDidMount: function () {
    DriverActions.load();
  },
  select: function(driver) {
    DriverActions.select(driver);
  },
  render: function() {
    var options = [];
    this.state.drivers.forEach((driver) => {
      options.push(
        <div key={driver.name} className="item" data-value={driver.name} onClick={this.select.bind(this, driver)}>
          {driver.label}
        </div>
      );
    });
    return (
      <Form>
        <Field>
          <label>Driver</label>
          <Dropdown className="selection" init={true}>
            <div className="default text">Driver</div>
            <div className="menu">
              {options}
            </div>
          </Dropdown>
        </Field>
      </Form>
    );
  }
});

export const CreateMachineForm = React.createClass<any, any>({
  mixins: [Reflux.connect(SelectedDriverStore, 'driver')],
  render: function(){
    var formComponent = null;
    var driver = this.state.driver
    if (driver && DriverFormMap[driver.name]){
      let Comp = DriverFormMap[driver.name]
      formComponent = (
          <Comp />
      );
    }
    return (
      <div>
        <DriverSelection />
        <Divider className="bottom-space" />
        {formComponent}
      </div>
    );
  }
});
