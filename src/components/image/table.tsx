import * as moment from 'moment';
import * as React from 'react';
import * as DateUtils from '../../utils/data-utils';
import { RemoveImageButton } from './buttons';
import { MachineProps, RemoveMachineImageActionProps } from '../shared/props'

const Semantify = require('react-semantify');
const prettysize = require('prettysize');

interface TableProps extends MachineProps, RemoveMachineImageActionProps {
  images: any[],
}

interface TableRowProps extends MachineProps, RemoveMachineImageActionProps {
  image: any,
}

class Header extends React.Component<any, any>{
  render() {
    return (
      <thead>
        <tr>
          <th className="collapsing"></th>
          <th>Repository</th>
          <th>Tag</th>
          <th>ID</th>
          <th>Virtual Size</th>
          <th>Created</th>
          <th className="collapsing"></th>
        </tr>
      </thead>
    );
  }
}

class Row extends React.Component<TableRowProps, any>{
  render() {
    const { machineName, image, removeMachineImage } = this.props;
    const repositories: string[] = [];
    const tags: string[] = [];
    const imageName = _.isEmpty(image.RepoTags) ? undefined : image.RepoTags[0];
    const pulling = /pulling/i.test(image.status);
    let id = image.Id || ''
    let pullingLoading = (<span />);
    let removeButton = (<noscript/>);
    image.RepoTags.map(repoTag => {
      let str = repoTag.split(':');
      repositories.push(str[0]);
      tags.push(str[1]);
    });
    if (pulling) {
      pullingLoading = (<i className="spinner icon loading" />)
    }

    if (imageName && !pulling) {
      removeButton = (
        <RemoveImageButton
          className="tiny compact"
          machineName={machineName}
          imageName={imageName}
          removeMachineImage={removeMachineImage}  />
      );
    }

    return (
      <tr>
        <td>{pullingLoading}</td>
        <td>{repositories.join(',')}</td>
        <td>{tags.join(',')}</td>
        <td>{id.substring(0, 12)}</td>
        <td>{prettysize(image.VirtualSize)}</td>
        <td>{moment(DateUtils.dockerTimestampToJsTimestamp(image.Created)).fromNow()}</td>
        <td>{removeButton}</td>
      </tr>
    )
  }
}

class Body extends React.Component<TableProps, any>{
  render() {
    const { machineName, removeMachineImage } = this.props;
    return (
      <tbody>
        {
          _.values(this.props.images).map((image:any) => {
            return (
              <Row key={image.Id}
                machineName={machineName}
                image={image}
                removeMachineImage={removeMachineImage} />
            )
          })
        }
      </tbody>
    );
  }
}

class ImageTable extends React.Component<TableProps, any>{
  render() {
    const { machineName, removeMachineImage } = this.props;
    return (
      <Semantify.Table>
        <Header />
        <Body
          machineName={machineName}
          images={this.props.images}
          removeMachineImage={removeMachineImage} />
      </Semantify.Table>
    );
  }
}

export default ImageTable;
