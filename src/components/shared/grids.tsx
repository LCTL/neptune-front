import * as React from 'react';

interface TwoColumnProps {
  left: any,
  right: any,
  leftClassName?: string,
  rightClassName?: string
}

export const OneColumn = React.createClass<any, any>({
  render: function(){
    return (
      <div className="ui grid">
        <div className="column">
          {this.props.children}
        </div>
      </div>
    );
  }
});

export const TwoColumn = React.createClass<any, any>({
  render: function(){
    var { left, right, leftClassName, rightClassName } = this.props
    if (!leftClassName) {
      leftClassName = 'four';
    }
    if (!rightClassName) {
      rightClassName = 'twelve'
    }
    return (
      <div className="ui grid">
        <div className={`${leftClassName} wide column`}>
          {left}
        </div>
        <div className={`${rightClassName} wide column`}>
          {right}
        </div>
      </div>
    );
  }
});
