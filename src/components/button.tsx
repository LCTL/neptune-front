import * as React from 'react';

export const Button = React.createClass<any, any>({
  render: function() {
    var loadingClass = this.props.loading ? 'loading' : '';
    return (
      <button {...this.props} className={`ui button ${this.props.className} ${loadingClass}`}>
        {this.props.children}
      </button>
    )
  }
});
