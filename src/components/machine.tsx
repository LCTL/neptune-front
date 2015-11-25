import * as React from 'react';

const Link = require('react-router').Link

export const Machine = React.createClass({
  render: function() {
    return (
      <div>
        <Link to={`/machines/${this.props.machine.name}`}>
          <i className='server icon'></i>
          <p>{this.props.machine.name}</p>
        </Link>
      </div>
    )
  }
});
