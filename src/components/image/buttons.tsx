import * as React from 'react';
import { Button } from '../shared/buttons';
import {
  StyleableProps,
  MachineStyleableProps,
  MachineImageStyleableProps,
  RemoveMachineImageActionProps
} from '../shared/props';

interface LoadMoreRegistryImageButtonProps extends StyleableProps {
  query: string,
  page: number,
  searchImages: (options: any) => void
}

interface PullMachineImageButtonProps extends MachineStyleableProps {
  imageName: string,
  pullMachineImage: (machineName: string, options: any) => void,
  pulling: string[]
}

interface ToggleShowAllImageButtonProps extends MachineStyleableProps {
  showAll: boolean,
  setShowAll: (showAll: boolean) => void,
  fetchMachineImageList: (machineName: string, options: any) => void
}

interface RemoveImageButtonProps extends
  MachineImageStyleableProps, RemoveMachineImageActionProps {

}

export class LoadMoreRegistryImageButton extends React.Component<LoadMoreRegistryImageButtonProps, any> {
  loadMore() {
    const { query, page, searchImages } = this.props;
    searchImages({
      q: query,
      page
    })
  }
  render() {
    const { className } = this.props;
    return (
      <Button className={`${className}`} onClick={this.loadMore.bind(this)}>Load More</Button>
    )
  }
}

export class PullMachineImageButton extends React.Component<PullMachineImageButtonProps, any> {
  pullMachineImage() {
    const { machineName, imageName, pullMachineImage } = this.props;
    pullMachineImage(machineName, {
      fromImage: imageName
    });
  }
  render() {
    const { className, imageName, pulling } = this.props;
    const disabledAndLoading = pulling.indexOf(imageName) >= 0;
    return (
      <Button
        className={`${className}`}
        onClick={this.pullMachineImage.bind(this)}
        loading={disabledAndLoading}
        disabled={disabledAndLoading}>
        {this.props.children}
      </Button>
    )
  }
}

export class ToggleShowAllImageButton extends React.Component<ToggleShowAllImageButtonProps, any>{
  fetchMachineImageList() {
    const { machineName, showAll, setShowAll, fetchMachineImageList } = this.props;
    setShowAll(!showAll);
    fetchMachineImageList(machineName, {all: !showAll});
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

export class RemoveImageButton extends React.Component<RemoveImageButtonProps, any>{
  removeMachineImage() {
    const { machineName, imageName, removeMachineImage } = this.props;
    removeMachineImage(machineName, imageName);
  }
  render() {
    const { className } = this.props;
    return (
      <Button className={`icon red ${className}`} onClick={this.removeMachineImage.bind(this)}>
        <i className='trash icon'></i>
        {this.props.children}
      </Button>
    )
  }
}
