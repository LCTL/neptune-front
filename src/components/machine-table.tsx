import * as _ from 'lodash';
import * as React from 'react';
import * as Reflux from 'reflux';
import { MachineActions } from '../actions/machine-action';
import {
  MachineIndexedStore,
  MachineNameOperatingStore,
  MachineModel
} from '../stores/machine-store';
import {
  MachineActionLoadingMixin,
  MachineOperationMixin,
  MachinePropsMixin
} from './shared/machine-mixin';
import {
  AutoSwitchStartStopMachineButton,
  RemoveMachineButton
} from './machine-control-button'
import { Button } from './button';

const reactSemantify = require('react-semantify');
const Link = require('react-router').Link

const Table = reactSemantify.Table;

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

const MachinesHeader = React.createClass<any, any>({
  render: function() {
    return (
      <thead>
        <tr>
          <th className="collapsing"></th>
          <th>Name</th>
          <th>State</th>
          <th>Driver</th>
          <th>URL</th>
          <th>SWARM</th>
          <th className="collapsing"></th>
        </tr>
      </thead>
    )
  }
});

const MachineNameLink = React.createClass<MachineProps, MachineState>({
  render: function() {
    const machine = this.props.machine;
    return (
      <Link to={`/machines/${machine.name}`}>
        {machine.name}
      </Link>
    );
  }
});

const MachineRow = React.createClass<MachineProps, MachineState>({
  render: function() {
    const machine = this.props.machine;
    return (
      <tr>
        <td className="collapsing">
          <AutoSwitchStartStopMachineButton
            className="tiny compact"
            state={machine.state}
            machineName={machine.name} />
        </td>
        <td>
          <MachineNameLink key={machine.name} machine={machine} />
        </td>
        <td>{machine.state}</td>
        <td>{machine.driver}</td>
        <td>{machine.url}</td>
        <td>{machine.swarm}</td>
        <td className="collapsing">
          <RemoveMachineButton className="tiny compact" machineName={machine.name} />
        </td>
      </tr>
    );
  }
});

const MachinesBody = React.createClass<MachinesProps, any>({
  render: function () {
    return (
      <tbody>
        {
          _.values(this.props.machines).map((machine:MachineModel) => {
            return (
              <MachineRow key={machine.name} machine={machine}/>
            )
          })
        }
      </tbody>
    );
  }
});

const CreateMachineButton = React.createClass<any, any>({
  render: function () {
    return (
      <Link to="/create-machine">
        <Button className="right floated primary">
          Create Machine
        </Button>
      </Link>
    )
  }
})

const MachinesFooter = React.createClass<any, any>({
  render: function () {
    return (
      <tfoot className="full-width">
        <tr>
          <th colSpan={7}>
            <CreateMachineButton />
          </th>
        </tr>
      </tfoot>
    );
  }
});

const NoMachineBody = React.createClass<any, MachinesState>({
  render: function() {
    return (
      <tbody>
        <tr>
          <td colSpan={7}>
            <p className="not-found">No machine found</p>
          </td>
        </tr>
      </tbody>
    )
  }
})

export const MachineTable = React.createClass<any, MachinesState>({
  mixins: [
    Reflux.connect(MachineIndexedStore, 'machines'),
    Reflux.listenTo(MachineNameOperatingStore, 'reload')
  ],
  componentDidMount: function () {
    MachineActions.load();
  },
  reload: function(names: string[]) {
    if (_.isEmpty(names)){
      MachineActions.load();
    }
  },
  render: function() {
    var body;
    if (_.isEmpty(this.state.machines)){
      body = (<NoMachineBody />);
    } else {
      body = (<MachinesBody machines={this.state.machines} />);
    }
    return (
      <Table className="machines-table">
        <MachinesHeader />
        {body}
        <MachinesFooter />
        {this.props.children}
      </Table>
    );
  }
});
