import * as _ from 'lodash';
import * as React from 'react';
import * as Reflux from 'reflux';
import { MachineActions } from '../actions/machine-action';
import {
  MachineIndexedStore,
  MachineNameOperatingStore,
  MachineModel
} from '../stores/machine-store';
import { MachineActionMixin, MachineOperationMixin } from './mixin/machine-mixin';

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

const MachineOperationButtonMixin = {
  getInitialState: function(){
    return {
      loading: false,
      disabled: false
    };
  },
  onOperating: function(names) {
    var operating = false;
    names.forEach(name => {
      if (name === this.props.machine.name) {
        operating = true
        this.state.disabled = true;
        this.setState(this.state);
      }
    });
    if (operating === false) {
      this.setState(this.getInitialState());
    }
  },
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

export const MachineControlButton = React.createClass<MachineProps, any>({
  mixins: [MachineOperationMixin, MachineActionMixin],
  getInitialState: function() {
    return {
      machineName: this.props.machine.name
    };
  },
  start: function() {
    MachineActions.start(this.props.machine.name);
    this.onAction();
  },
  stop: function() {
    MachineActions.stop(this.props.machine.name);
    this.onAction();
  },
  render: function() {
    const machine = this.props.machine;
    let button;
    if (/running/i.test(machine.state)) {
      button = (
        <Button className="tiny icon yellow" loading={this.state.loading} disabled={this.state.operating} onClick={this.stop}>
          <i className='stop icon'></i>
        </Button>
      );
    } else if (/stopped/i.test(machine.state)) {
      button =  (
        <Button className="tiny icon green" loading={this.state.loading} disabled={this.state.operating} onClick={this.start}>
          <i className='play icon'></i>
        </Button>
      );
    } else {
      button = (
        <span />
      )
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
  mixins: [MachineOperationMixin, MachineActionMixin],
  getInitialState: function() {
    return {
      machineName: this.props.machine.name
    };
  },
  remove: function(){
    MachineActions.remove(this.props.machine.name);
    this.onAction();
  },
  render: function() {
    return (
      <Button className="tiny icon red" loading={this.state.loading} disabled={this.state.operating} onClick={this.remove}>
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
          <th colSpan={7}>
            <ShowCreateMachineModalButton />
          </th>
        </tr>
      </tfoot>
    );
  }
});

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
    return (
      <Table className="machines-table">
        <MachinesHeader />
        <MachinesBody machines={this.state.machines} />
        <MachinesFooter />
        {this.props.children}
      </Table>
    );
  }
});
