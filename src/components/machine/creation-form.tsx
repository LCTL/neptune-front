import * as _ from 'lodash';
import * as React from 'react';
import * as Reflux from 'reflux';
import { connect } from 'react-redux';
import * as drivers from '../../constants/drivers';
import { select } from '../../actions/driver-action'
import { create } from '../../actions/machine-action'
import {
  Form,
  Field,
  InputField,
  HiddenField,
  CheckboxField,
  DropdownField,
  SubmitButton,
  SubmitButtonControlMixin
} from '../shared/form';

const History = require('react-router').History;
const reactSemantify = require('react-semantify');
const Dropdown = reactSemantify.Dropdown;
const Divider = reactSemantify.Divider;

const selectedDriverProps = state => ({
  selectedDriver: state.driver.selected
});

const MachineFormMixin = {
  create: function(data) {
    var machineName = data.name
    if (data['virtualbox-no-share'] === true) {
      data['virtualbox-no-share'] = '';
    }
    delete data.name;
    this.props.dispatch(create(machineName, data));
    this.history.pushState(null, '/');
  }
}

export const VirtualBoxForm = connect()(React.createClass<any, any>({
  mixins: [
    History,
    SubmitButtonControlMixin,
    MachineFormMixin
  ],
  render: function() {
    return (
      <Form onValidSubmit={this.create} onValid={this.enableButton} onInvalid={this.disableButton}>
        <HiddenField name="driver" value="virtualbox" />
        <div className="four fields">
          <InputField
            name="name"
            label="Machine Name"
            required />
          <InputField
            type="number"
            name="virtualbox-memory"
            label="Memory" />
          <InputField
            type="number"
            name="virtualbox-cpu-count"
            label="CPU Count" />
          <InputField
            type="number"
            name="virtualbox-disk-size"
            label="Disk Size (MB)" />
        </div>
        <div className="two fields">
          <InputField
            type="text"
            name="virtualbox-boot2docker-url"
            label="Boot2Docker Image URL" />
          <InputField
            type="text"
            name="virtualbox-import-boot2docker-vm"
            label="Boot2Docker VM to import" />
        </div>
        <div className="three fields">
          <InputField
            type="text"
            name="virtualbox-hostonly-cidr"
            label="CIDR of the host only adapter" />
          <InputField
            type="text"
            name="virtualbox-hostonly-nictype"
            label="Host Only Network Adapter Type" />
          <InputField
            type="text"
            name="virtualbox-hostonly-nicpromisc"
            label="Host Only Network Adapter Promiscuous Mode" />
        </div>
        <CheckboxField
          className="toggle"
          name="virtualbox-no-share"
          label="Disable the mount of your home directory" />
        <SubmitButton className="green" disabled={this.state.disableSubmit || this.state.operating} loading={this.state.loading} text="Create" />
      </Form>
    );
  }
}));

const DriverFormMap = {
  [drivers.VIRTUAL_BOX.name]: VirtualBoxForm
}

export const DriverSelection = connect(selectedDriverProps)(React.createClass<any, any>({
  select: function(data) {
    var driver = Object.keys(drivers).map(key => drivers[key])
      .filter((driver) => driver.name === data.driver)[0];
    this.props.dispatch(select(driver));
  },
  render: function() {
    const options = [];
    const text = this.props.selectedDriver.label || 'Driver'
    Object.keys(drivers).map(key => drivers[key]).forEach((driver) => {
      options.push(
        <div key={driver.name} className="item" data-value={driver.name}>
          {driver.label}
        </div>
      );
    });
    return (
      <Form onChange={this.select}>
        <DropdownField name="driver" label="Driver" className="search selection">
          <div className="default text">{text}</div>
          <div className="menu">
            {options}
          </div>
        </DropdownField>
      </Form>
    );
  }
}));

export const MachineCreationForm = connect(selectedDriverProps)(React.createClass<any, any>({
  render: function(){
    var formComponent = null;
    var driver = this.props.selectedDriver
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
}));
