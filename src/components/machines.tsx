import * as React from 'react';
import * as Reflux from 'reflux';
import { MachinesActions } from '../actions/machines-action';
import { MachinesStore, MachineModel } from '../stores/machines-store';
import { Machine } from './machine';

const Link = require('react-router').Link
const Table = require('react-semantify').Table;

export interface Props {}

export interface State {
  machines: MachineModel[]
}

export const Machines = React.createClass<Props, State>({
  mixins: [Reflux.connect(MachinesStore, 'machines')],
  componentDidMount: function () {
    MachinesActions.load();
  },
  render: function() {
    return (
      <Table className="celled padded">
        <thead>
          <tr>
            <td>Name</td>
            <td>Driver</td>
            <td>State</td>
            <td>URL</td>
            <td>SWARM</td>
          </tr>
        </thead>
        <tbody>
          {
            this.state.machines.map(machine => {
              return (
                <tr>
                  <td>
                    <Link to={`/machines/${machine.name}`}>
                      <i className='server icon'></i>{machine.name}
                    </Link>
                  </td>
                  <td>{machine.driver}</td>
                  <td>{machine.state}</td>
                  <td>{machine.url}</td>
                  <td>{machine.swarm}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }
});
