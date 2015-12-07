import * as React from 'react';
import { IconProps } from './props';

export const HugeHeader = React.createClass<IconProps, any>({
  render: function() {
    var icon = this.props.icon ? this.props.icon : '';
    return (
      <div className="ui huge header">
        <i className={`${icon} icon`}></i>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
});

export const CenterCircularHeader = React.createClass<IconProps, any>({
  render: function() {
    var icon = this.props.icon ? this.props.icon : '';
    return (
      <h2 className="ui center aligned icon header">
        <i className={`${icon} circular layout icon`}></i>
        {this.props.children}
      </h2>
    )
  }
})
