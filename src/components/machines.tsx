import * as React from 'react';
import * as Reflux from 'reflux';
import { MachinesActions } from '../actions/machines-action';
import { MachinesStore, MachineModel } from '../stores/machines-store';
import { Machine } from './machine';

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
      <div className='ui relaxed divided list'>
        <div className='item'>
          {
            this.state.machines.map(machine => {
              return <Machine key={machine.name} machine={machine} />
            })
          }
        </div>
      </div>
    )
  }
});
