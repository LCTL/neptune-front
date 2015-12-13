import * as React from 'react';
import { Button } from '../shared/buttons';
import { StyleableProps, MachineStyleableProps } from '../shared/props';

interface LoadMoreRegistryImageButtonProps extends StyleableProps {
  query: string,
  page: number,
  searchImages: (options: any) => void
}

interface PullMachineImageButtonProps extends MachineStyleableProps {
  imageName: string,
  createMachineImage: (machineName: string, options: any) => void
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
    const { machineName, imageName, createMachineImage } = this.props;
    createMachineImage(machineName, {
      fromImage: imageName
    });
  }
  render() {
    const { className } = this.props;
    return (
      <Button className={`${className}`} onClick={this.pullMachineImage.bind(this)}>
        {this.props.children}
      </Button>
    )
  }
}
