import * as _ from 'lodash';
import * as React from 'react';
import * as Reflux from 'reflux';
import { DriverActions } from '../actions/driver-action'
import { MachineActions } from '../actions/machine-action'
import { DriversStore, SelectedDriverStore } from '../stores/driver-store'

const reactSemantify = require('react-semantify');
const Form = reactSemantify.Form;
const Field = reactSemantify.Field;
const Label = reactSemantify.Label;
const Input = reactSemantify.Input;
const Dropdown = reactSemantify.Dropdown;
const Icon = reactSemantify.Icon;
const Button = reactSemantify.Button;

export const CallbackableField = React.createClass<any, any>({
  render: function() {
    return (
      <Field>
        <Label>{this.props.label}</Label>
        <Input {...this.props} />
      </Field>
    );
  }
});

export const VirtualBoxForm = React.createClass<any, any>({
  getInitialState: function() {
    return {
      name: '',
      driver: {
        name: 'virtualbox',
        options: {
          'virtualbox-memory': 512
        }
      }
    }
  },
  fieldUpdate: function(event) {
    var property = event.target.name
    var value = event.target.value
    _.set(this.state, property, value);
    this.setState(this.state);
  },
  create: function() {
    MachineActions.create(this.state.name, this.state.driver);
  },
  render: function() {
    return (
      <Form>
        <CallbackableField name="name" label="Machine Name" onChange={this.fieldUpdate} />
        <CallbackableField
          type="number"
          name="driver.options.virtualbox-memory"
          label="Memory"
          value={this.state.driver.options['virtualbox-memory']}
          onChange={this.fieldUpdate} />
        <Button className="green" onClick={this.create}>Create</Button>
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
          <Label>Driver</Label>
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
        {formComponent}
      </div>
    );
  }
});
