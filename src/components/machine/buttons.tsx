import * as _ from 'lodash';
import * as React from 'react';
import { fetchStatus, start, stop, remove } from '../../actions/machine-actions';
import { MachineStyleableProps } from '../shared/props'
import { Button } from '../shared/buttons';
import { connect } from 'react-redux';

interface AutoSwitchStartStopMachinButtonProps extends MachineStyleableProps {
  state?: string,
  stopChildren?: any,
  startChildren?: any
}

function isOperating(name: string, operating) {
  return _.values(operating)
    .filter((arr: any[]) => _.include(arr, name))
    .length > 0;
}

function isActionOperating(name: string, action: string, operating) {
  return operating[action]
    .filter(n => n === name)
    .length > 0;
}

function operatingProps(state) {
  return {
    operating: state.machine.operating
  }
}

function statusesProps(state) {
  return {
    statusesByName: state.machine.statusesByName
  }
}

export const StopMachineButton = connect(operatingProps)(React.createClass<MachineStyleableProps, any>({
  stop: function() {
    const { dispatch, machineName } = this.props;
    dispatch(stop(machineName));
  },
  render: function(){
    const { machineName, operating } = this.props;
    const loading = isActionOperating(machineName, 'stop', operating)
    const disabled = isOperating(machineName, operating);
    return (
      <Button className={`icon yellow ${this.props.className}`}
        loading={loading}
        disabled={disabled}
        onClick={this.stop}>
        <i className='stop icon'></i>
        {this.props.children}
      </Button>
    )
  }
}));

export const StartMachineButton = connect(operatingProps)(React.createClass<MachineStyleableProps, any>({
  start: function() {
    const { dispatch, machineName } = this.props;
    dispatch(start(machineName));
  },
  render: function(){
    const { machineName, operating } = this.props;
    const loading = isActionOperating(machineName, 'start', operating)
    const disabled = isOperating(machineName, operating);
    return (
      <Button className={`icon green ${this.props.className}`}
        loading={loading}
        disabled={disabled}
        onClick={this.start}>
        <i className='play icon'></i>
        {this.props.children}
      </Button>
    )
  }
}));

export const RemoveMachineButton = connect(operatingProps)(React.createClass<MachineStyleableProps, any>({
  remove: function(){
    const { dispatch, machineName } = this.props;
    dispatch(remove(machineName));
  },
  render: function() {
    const { machineName, operating } = this.props;
    const loading = isActionOperating(machineName, 'remove', operating)
    const disabled = isOperating(machineName, operating);
    return (
      <Button className={`icon red ${this.props.className}`}
        loading={loading}
        disabled={disabled}
        onClick={this.remove}>
        <i className='trash icon'></i>
        {this.props.children}
      </Button>
    );
  }
}));

export const AutoSwitchStartStopMachineButton = connect(statusesProps)(React.createClass<AutoSwitchStartStopMachinButtonProps, any>({
  render: function() {
    const { dispatch, machineName, statusesByName } = this.props;
    var state = statusesByName[machineName] || this.props.state;
    var button;

    if (!state) {
      dispatch(fetchStatus(machineName));
    }

    if (machineName && /running/i.test(state)) {
      button = (
        <StopMachineButton {...this.props}>
          {this.props.stopChildren}
        </StopMachineButton>
      );
    } else if (machineName && /stopped/i.test(state)) {
      button =  (
        <StartMachineButton {...this.props}>
          {this.props.startChildren}
        </StartMachineButton>
      );
    } else {
      button = (
        <span />
      )
    }
    return button;
  }
}));
