import * as React from 'react';
import { Button } from '../shared/buttons';
import {
  StyleableProps,
  FetchContainerListActionProps,
  ContainerStyleableProps,
  StartContainerActionProps,
  StopContainerActionProps,
  RemoveContainerActionProps
} from '../shared/props';

interface ToggleShowAllContainersButtonProps extends StyleableProps, FetchContainerListActionProps {
  showAll: boolean,
  setShowAll: (showAll: boolean) => void
}

interface StartContainerButtonProps extends ContainerStyleableProps, StartContainerActionProps {

}

interface StopContainerButtonProps extends ContainerStyleableProps, StopContainerActionProps {

}

interface RemoveContainerButtonProps extends ContainerStyleableProps, RemoveContainerActionProps {

}

interface AutoSwitchStartStopButtonProps extends
  ContainerStyleableProps,
  StartContainerActionProps,
  StopContainerActionProps {
    containerStatus: string
}

export class ToggleShowAllContainersButton extends React.Component<ToggleShowAllContainersButtonProps, any>{
  fetchMachineImageList() {
    const { showAll, setShowAll, fetchContainerList } = this.props;
    setShowAll(!showAll);
    fetchContainerList({all: !showAll});
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
    const { containerId, startContainer } = this.props;
    startContainer(containerId);
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
    const { containerId, stopContainer } = this.props;
    stopContainer(containerId);
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

export class RemoveContainerButton extends React.Component<RemoveContainerButtonProps, any>{
  removeMachineContainer() {
    const { containerId, removeContainer } = this.props;
    removeContainer(containerId);
  }
  render() {
    const { className } = this.props;
    return (
      <Button className={`icon red ${className}`} onClick={this.removeMachineContainer.bind(this)}>
        <i className='trash icon'></i>
        {this.props.children}
      </Button>
    )
  }
}

export class AutoSwitchStartStopButton extends React.Component<AutoSwitchStartStopButtonProps, any>{
  render() {
    const {
      className,
      containerStatus,
      containerId,
      startContainer,
      stopContainer
    } = this.props;
    let button = (<noscript />);
    if (/up|running/i.test(containerStatus)) {
      button = (
        <StopContainerButton
          className={className}
          containerId={containerId}
          stopContainer={stopContainer} />
      );
    } else if (/(exit|created)/i.test(containerStatus)) {
      button = (
        <StartContainerButton
          className={className}
          containerId={containerId}
          startContainer={startContainer} />
      );
    }
    return button;
  }
}
