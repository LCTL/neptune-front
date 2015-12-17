import * as React from 'react';
import { Button } from '../shared/buttons';
import {
  StyleableProps,
  MachineStyleableProps,
  MachineContainerStyleableProps,
  StartMachineContainerActionProps,
  StopMachineContainerActionProps
} from '../shared/props';

interface ToggleShowAllContainersButtonProps extends MachineStyleableProps {
  showAll: boolean,
  setShowAll: (showAll: boolean) => void,
  fetchMachineContainerList: (machineName: string, options: any) => void
}

interface StartContainerButtonProps extends MachineContainerStyleableProps, StartMachineContainerActionProps {

}

interface StopContainerButtonProps extends MachineContainerStyleableProps, StopMachineContainerActionProps {

}

interface AutoSwitchStartStopButtonProps extends
  MachineContainerStyleableProps,
  StartMachineContainerActionProps,
  StopMachineContainerActionProps {
    containerStatus: string
}

export class ToggleShowAllContainersButton extends React.Component<ToggleShowAllContainersButtonProps, any>{
  fetchMachineImageList() {
    const { machineName, showAll, setShowAll, fetchMachineContainerList } = this.props;
    setShowAll(!showAll);
    fetchMachineContainerList(machineName, {all: !showAll});
  }
  render() {
    const { className } = this.props;
    return (
      <Button className={`${className}`} onClick={this.fetchMachineImageList.bind(this)}>
        {this.props.children}
      </Button>
    )
  }
}

export class StartContainerButton extends React.Component<StartContainerButtonProps, any>{
  startMachineContainer() {
    const { machineName, containerId, startMachineContainer } = this.props;
    startMachineContainer(machineName, containerId);
  }
  render() {
    const { className } = this.props;
    return (
      <Button className={`icon green ${className}`} onClick={this.startMachineContainer.bind(this)}>
        <i className='play icon'></i>
        {this.props.children}
      </Button>
    )
  }
}

export class StopContainerButton extends React.Component<StopContainerButtonProps, any>{
  stopMachineContainer() {
    const { machineName, containerId, stopMachineContainer } = this.props;
    stopMachineContainer(machineName, containerId);
  }
  render() {
    const { className } = this.props;
    return (
      <Button className={`icon yellow ${className}`} onClick={this.stopMachineContainer.bind(this)}>
        <i className='stop icon'></i>
        {this.props.children}
      </Button>
    )
  }
}

export class AutoSwitchStartStopButton extends React.Component<AutoSwitchStartStopButtonProps, any>{
  render() {
    const {
      className,
      machineName,
      containerStatus,
      containerId,
      startMachineContainer,
      stopMachineContainer
    } = this.props;
    let button = (<noscript />);
    if (/up/i.test(containerStatus)) {
      button = (
        <StopContainerButton
          className={className}
          machineName={machineName}
          containerId={containerId}
          stopMachineContainer={stopMachineContainer} />
      );
    } else if (/(exit|created)/i.test(containerStatus)) {
      button = (
        <StartContainerButton
          className={className}
          machineName={machineName}
          containerId={containerId}
          startMachineContainer={startMachineContainer} />
      );
    }
    return button;
  }
}
