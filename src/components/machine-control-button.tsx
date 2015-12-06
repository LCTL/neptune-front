import * as React from 'react';
import * as Reflux from 'reflux';
import { MachineActions } from '../actions/machine-action';
import {
  MachineActionLoadingMixin,
  MachineOperationMixin,
  MachinePropsMixin
} from './mixin/machine-mixin';
import { Button } from './button';

interface MachineControlButtonProps {
  className?: string,
  machineName: string
}

interface AutoSwitchStartStopMachinButtonProps extends MachineControlButtonProps {
  state: string,
  stopChildren?: any,
  startChildren?: any
}

export const StopMachineButton = React.createClass<MachineControlButtonProps, any>({
  mixins: [MachineActionLoadingMixin('stop'), MachineOperationMixin, MachinePropsMixin],
  stop: function() {
    MachineActions.stop(this.props.machineName);
  },
  render: function(){
    return (
      <Button className={`icon yellow ${this.props.className}`}
        loading={this.state.loading}
        disabled={this.state.operating}
        onClick={this.stop}>
        <i className='stop icon'></i>
        {this.props.children}
      </Button>
    )
  }
});

export const StartMachineButton = React.createClass<MachineControlButtonProps, any>({
  mixins: [MachineActionLoadingMixin('start'), MachineOperationMixin, MachinePropsMixin],
  start: function() {
    MachineActions.start(this.props.machineName);
  },
  render: function(){
    return (
      <Button className={`icon green ${this.props.className}`}
        loading={this.state.loading}
        disabled={this.state.operating}
        onClick={this.start}>
        <i className='play icon'></i>
        {this.props.children}
      </Button>
    )
  }
});

export const RemoveMachineButton = React.createClass<MachineControlButtonProps, any>({
  mixins: [MachineActionLoadingMixin('remove'), MachineOperationMixin, MachinePropsMixin],
  remove: function(){
    MachineActions.remove(this.props.machineName);
  },
  render: function() {
    return (
      <Button className={`icon red ${this.props.className}`}
        loading={this.state.loading}
        disabled={this.state.operating}
        onClick={this.remove}>
        <i className='trash icon'></i>
        {this.props.children}
      </Button>
    );
  }
});

export const AutoSwitchStartStopMachineButton = React.createClass<AutoSwitchStartStopMachinButtonProps, any>({
  render: function() {
    const state = this.props.state;
    const machineName = this.props.machineName;
    let button;
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
});
