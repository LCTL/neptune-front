import * as React from 'react';
import { Button } from '../shared/buttons';
import {
  StyleableProps,
  ImageStyleableProps,
  FetchImageListActionProps,
  PullImageActionProps,
  RemoveImageActionProps,
  SearchRegistryImageActionProps
} from '../shared/props';

interface LoadMoreRegistryImageButtonProps extends StyleableProps, SearchRegistryImageActionProps {
  query: string,
  page: number
}

interface PullMachineImageButtonProps extends StyleableProps, PullImageActionProps {
  imageName: string,
  pulling: string[]
}

interface ToggleShowAllImageButtonProps extends StyleableProps, FetchImageListActionProps {
  showAll: boolean,
  setShowAll: (showAll: boolean) => void
}

interface RemoveImageButtonProps extends
  ImageStyleableProps, RemoveImageActionProps {

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
    const { imageName, pullImage } = this.props;
    pullImage({
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
    const { showAll, setShowAll, fetchImageList } = this.props;
    setShowAll(!showAll);
    fetchImageList({all: !showAll});
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
    const { imageName, removeImage } = this.props;
    removeImage(imageName);
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
