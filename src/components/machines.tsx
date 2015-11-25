import * as React from 'react';
import * as Reflux from 'reflux';
import * as MachinesActions from '../actions/machines-action';
import * as MachinesStore from '../stores/machines-store';

const Machine = require('./machine').Machine;

export const Machines = React.createClass({
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
})
