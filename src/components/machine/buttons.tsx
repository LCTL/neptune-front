import * as _ from 'lodash';
import * as React from 'react';
import { MachineStyleableProps } from '../shared/props'
import { Button } from '../shared/buttons';

interface Operating {
  operating: any
}

interface StartAction extends Operating, MachineStyleableProps {
  start: (machineName: string) => void
}

interface StopAction extends Operating, MachineStyleableProps {
  stop: (machineName: string) => void
}

interface RemoveButtonProps extends Operating, MachineStyleableProps {
  remove: (machineName: string) => void
}

interface AutoSwitchStartStopMachinButtonProps extends
  MachineStyleableProps, StartAction, StopAction {
  status?: string,
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

export const StopMachineButton = React.createClass<MachineStyleableProps, any>({
  stop: function() {
    const { stop, machineName } = this.props;
    stop(machineName);
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
});

export const StartMachineButton = React.createClass<MachineStyleableProps, any>({
  start: function() {
    const { start, machineName } = this.props;
    start(machineName);
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
});

export const RemoveMachineButton = React.createClass<RemoveButtonProps, any>({
  remove: function(){
    const { remove, machineName } = this.props;
    remove(machineName);
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
});

export const AutoSwitchStartStopMachineButton = React.createClass<AutoSwitchStartStopMachinButtonProps, any>({
  render: function() {
    const { machineName, status } = this.props;
    var button;

    if (machineName && /running/i.test(status)) {
      button = (
        <StopMachineButton {...this.props}>
          {this.props.stopChildren}
        </StopMachineButton>
      );
    } else if (machineName && /stopped/i.test(status)) {
      button =  (
        <StartMachineButton {...this.props}>
          {this.props.startChildren}
        </StartMachineButton>
      );
    } else {
      button = (
        <noscript />
      )
    }
    return button;
  }
});
