import * as React from 'react';
import { MachineProps } from '../shared/props'
import { PullMachineImageButton } from './buttons'

const { Table } = require('react-semantify');

interface CreateImageAction {
  pullMachineImage: (machineName: string, options: any) => void
}

interface HubImageTableProps extends MachineProps, CreateImageAction {
  images: any[],
  pulling: string[]
}

interface RowProps extends MachineProps, CreateImageAction {
  image: any,
  pulling: string[]
}

class Head extends React.Component<any, any>{
  render() {
    return (
      <thead>
        <tr>
          <th className="collapsing">Name</th>
          <th>Description</th>
          <th className="collapsing">Star</th>
          <th className="collapsing"></th>
        </tr>
      </thead>
    )
  }
}

class Row extends React.Component<RowProps, any>{
  render() {
    const { machineName, image, pulling, pullMachineImage } = this.props;
    var baseUrl = 'https://hub.docker.com';
    if (image.is_official){
      baseUrl += '/_';
    } else {
      baseUrl += '/r';
    }
    return (
      <tr>
        <td className="collapsing">
          <p>
            <a href={`${baseUrl}/${image.name}/`} target="_blank">{image.name}</a>
          </p>
          <p>
            <span>{image.is_official ? 'official' : 'public'}</span>
            <span>{image.is_automated ? ' | automated build' : ''}</span>
          </p>
        </td>
        <td>{image.description}</td>
        <td className="collapsing">{image.star_count}</td>
        <td className="collapsing">
          <PullMachineImageButton
            className="basic blue icon compact"
            machineName={machineName}
            pullMachineImage={pullMachineImage}
            pulling={pulling}
            imageName={image.name}>
            <i className='arrow down icon'></i>
          </PullMachineImageButton>
        </td>
      </tr>
    )
  }
}

class Body extends React.Component<HubImageTableProps, any>{
  render() {
    const { machineName } = this.props;
    return (
      <tbody>
        {
          _.values(this.props.images).map((image:any) => {
            return (
              <Row key={image.name} {...this.props} image={image}/>
            )
          })
        }
      </tbody>
    )
  }
}

class HubImageTable extends React.Component<HubImageTableProps, any>{
  render() {
    return (
      <Table>
        <Head />
        <Body {...this.props} />
      </Table>
    )
  }
}

export default HubImageTable;
