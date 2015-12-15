import * as React from 'react';
import { StyleableProps } from './props';

interface LoaderProps extends StyleableProps {
  dimmerClassName?: string,
  active?: boolean
}

export class Loader extends React.Component<LoaderProps, any>{
  render() {
    const { className, dimmerClassName, active, children } = this.props;
    return (
      <div className={`ui dimmer ${dimmerClassName || ''} ${active ? 'active' : ''}`}>
        <div className={`ui loader ${className || ''}`}>
          {children}
        </div>
      </div>
    );
  }
};
