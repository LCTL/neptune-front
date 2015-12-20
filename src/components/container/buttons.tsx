import * as React from 'react';
import { concatObjectArrays } from '../../utils/object-utils';
import { Button } from '../shared/buttons';
import {
  StyleableProps,
  OperatingProps,
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

interface StartContainerButtonProps extends
  OperatingProps,
  ContainerStyleableProps,
  StartContainerActionProps {

}

interface StopContainerButtonProps extends
  OperatingProps,
  ContainerStyleableProps,
  StopContainerActionProps {

}

interface RemoveContainerButtonProps extends
  OperatingProps,
  ContainerStyleableProps,
  RemoveContainerActionProps {

}

interface AutoSwitchStartStopButtonProps extends
  OperatingProps,
  ContainerStyleableProps,
  StartContainerActionProps,
  StopContainerActionProps {
    containerStatus: string,
    stopChildren?: any,
    startChildren?: any
}

function isOperating(containerId: string, operating) {
  return _.includes(concatObjectArrays(operating), containerId);
}

function isActionOperating(containerId: string, action: string, operating) {
  return _.includes(operating[action], containerId);
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
    const { className, containerId, operating } = this.props;
    const loading = isActionOperating(containerId, 'start', operating)
    const disabled = isOperating(containerId, operating);
    return (
      <Button
        className={`icon green ${className}`}
        loading={loading}
        disabled={disabled}
        onClick={this.startMachineContainer.bind(this)}>
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
    const { className, containerId, operating } = this.props;
    const loading = isActionOperating(containerId, 'stop', operating)
    const disabled = isOperating(containerId, operating);
    return (
      <Button
        className={`icon yellow ${className}`}
        loading={loading}
        disabled={disabled}
        onClick={this.stopMachineContainer.bind(this)}>
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
    const { className, containerId, operating } = this.props;
    const loading = isActionOperating(containerId, 'remove', operating)
    const disabled = isOperating(containerId, operating);
    return (
      <Button
        className={`icon red ${className}`}
        loading={loading}
        disabled={disabled}
        onClick={this.removeMachineContainer.bind(this)}>
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
      operating,
      containerId,
      startContainer,
      stopContainer,
      stopChildren,
      startChildren
    } = this.props;
    let button = (<noscript />);
    if (/up|running/i.test(containerStatus)) {
      button = (
        <StopContainerButton
          className={className}
          operating={operating}
          containerId={containerId}
          stopContainer={stopContainer}>
          {stopChildren}
        </StopContainerButton>
      );
    } else if (/(exit|created)/i.test(containerStatus)) {
      button = (
        <StartContainerButton
          className={className}
          operating={operating}
          containerId={containerId}
          startContainer={startContainer}>
          {startChildren}
        </StartContainerButton>
      );
    }
    return button;
  }
}
