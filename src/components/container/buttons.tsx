import * as React from 'react';
import { Button } from '../shared/buttons';
import { StyleableProps, MachineStyleableProps } from '../shared/props';

interface ToggleShowAllContainersButtonProps extends MachineStyleableProps {
  showAll: boolean,
  setShowAll: (showAll: boolean) => void,
  fetchMachineContainerList: (machineName: string, options: any) => void
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
