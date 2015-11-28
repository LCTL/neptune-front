import * as React from 'react';
import * as Reflux from 'reflux';
import { MachinesActions } from '../actions/machines-action';
import { MachinesStore, MachineModel } from '../stores/machines-store';

const reactSemantify = require('react-semantify');
const Link = require('react-router').Link

const Table = reactSemantify.Table;
const Button = reactSemantify.Button;

interface MachinesState {
  machines: MachineModel[]
}

interface MachineState {
  machine: MachineModel
}

interface MachinesProps extends MachinesState {}
interface MachineProps extends MachineState {
  key: string
}

export const MachinesHeader = React.createClass<any, any>({
  render: function() {
    return (
      <thead>
        <tr>
          <td className="collapsing"></td>
          <td>Name</td>
          <td>State</td>
          <td>Driver</td>
          <td>URL</td>
          <td>SWARM</td>
          <td className="collapsing"></td>
        </tr>
      </thead>
    )
  }
});

export const MachineControlButton = React.createClass<MachineProps, MachineState>({
  getInitialState: function(){
    return {
      machine: this.props.machine
    };
  },
  start: function() {
    console.log('start', this.state.machine);
  },
  stop: function() {
    console.log('stop', this.state.machine);
  },
  render: function() {
    const machine = this.state.machine;
    let button;
    if (/running/i.test(machine.state)) {
      button = (
        <Button className="tiny icon yellow" onClick={this.stop}>
          <i className='stop icon'></i>
        </Button>
      );
    } else if (/stopped/i.test(machine.state)) {
      button =  (
        <Button className="tiny icon green" onClick={this.start}>
          <i className='play icon'></i>
        </Button>
      );
    }

    return button;
  }
});

export const MachineNameLink = React.createClass<MachineProps, MachineState>({
  render: function() {
    const machine = this.props.machine;
    return (
      <Link to={`/machines/${machine.name}`}>
        <i className='server icon'></i>{machine.name}
      </Link>
    );
  }
});

export const RemoveMachineButton = React.createClass<MachineProps, any>({
  remove: function(){
    console.log('remove', this.props.machine);
  },
  render: function() {
    return (
      <Button className="tiny icon red" onClick={this.remove}>
        <i className='trash icon'></i>
      </Button>
    );
  }
});

export const MachineRow = React.createClass<MachineProps, MachineState>({
  render: function() {
    const machine = this.props.machine;
    return (
      <tr>
        <td className="collapsing">
          <MachineControlButton key={machine.name} machine={machine} />
        </td>
        <td>
          <MachineNameLink key={machine.name} machine={machine} />
        </td>
        <td>{machine.state}</td>
        <td>{machine.driver}</td>
        <td>{machine.url}</td>
        <td>{machine.swarm}</td>
        <td className="collapsing">
          <RemoveMachineButton key={machine.name} machine={machine} />
        </td>
      </tr>
    );
  }
});

export const MachinesBody = React.createClass<MachinesProps, any>({
  render: function () {
    return (
      <tbody>
        {
          this.props.machines.map(machine => {
            return (
              <MachineRow key={machine.name} machine={machine}/>
            )
          })
        }
      </tbody>
    );
  }
});

export const ShowCreateMachineModalButton = React.createClass<any, any>({
  render: function () {
    return (
      <div>
        <Link to="/create-machine">
          <div className="ui right floated small primary labeled icon button" onClick={this.showModal}>
            <i className="server icon"></i> Create Machine
          </div>
        </Link>
      </div>
    )
  }
})

export const MachinesFooter = React.createClass<any, any>({
  render: function () {
    return (
      <tfoot className="full-width">
        <tr>
          <th></th>
          <th colSpan={5}>
            <ShowCreateMachineModalButton />
          </th>
          <th></th>
        </tr>
      </tfoot>
    );
  }
});

export const Machines = React.createClass<any, MachinesState>({
  mixins: [Reflux.connect(MachinesStore, 'machines')],
  componentDidMount: function () {
    MachinesActions.load();
  },
  render: function() {
    return (
      <Table className="machines-table">
        <MachinesHeader />
        <MachinesBody machines={this.state.machines} />
        <MachinesFooter />
      </Table>
    );
  }
});
