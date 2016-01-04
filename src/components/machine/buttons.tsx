import * as _ from 'lodash';
import * as React from 'react';
import { MachineStyleableProps, RegenerateMachineCertsProps } from '../shared/props'
import { OperationButton } from '../shared/buttons';

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

interface RegenerateCertsButtonProps extends
  Operating, MachineStyleableProps, RegenerateMachineCertsProps {

}

export const StopMachineButton = React.createClass<MachineStyleableProps, any>({
  stop: function() {
    const { stop, machineName } = this.props;
    stop(machineName);
  },
  render: function(){
    const { machineName, operating } = this.props;
    return (
      <OperationButton
        className={`icon yellow ${this.props.className}`}
        operating={operating}
        operatingName="stop"
        operatingKey={machineName}
        onClick={this.stop}>
        <i className='stop icon'></i>
        {this.props.children}
      </OperationButton>
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
    return (
      <OperationButton
        className={`icon green ${this.props.className}`}
        operating={operating}
        operatingName="start"
        operatingKey={machineName}
        onClick={this.start}>
        <i className='play icon'></i>
        {this.props.children}
      </OperationButton>
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
    return (
      <OperationButton
        className={`icon red ${this.props.className}`}
        operating={operating}
        operatingName="remove"
        operatingKey={machineName}
        onClick={this.remove}>
        <i className='trash icon'></i>
        {this.props.children}
      </OperationButton>
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

export class RegenerateCertsButton extends React.Component<RegenerateCertsButtonProps, any>{
  regenerateCerts() {
    const { machineName, regenerateCerts } = this.props;
    regenerateCerts(machineName);
  }
  render() {
    const { className, machineName, operating, children } = this.props;
    return (
      <OperationButton
        className={`icon red ${className}`}
        operating={operating}
        operatingName="regenerateCerts"
        operatingKey={machineName}
        onClick={this.regenerateCerts.bind(this)}>
        <i className='refresh icon'></i>
        {children}
      </OperationButton>
    )
  }
}
