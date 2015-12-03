import * as React from 'react';

export const Button = React.createClass<any, any>({
  render: function() {
    return (
      <button {...this.props} className={`ui button ${this.props.className}`}>
        {this.props.children}
      </button>
    )
  }
});
