import * as _ from 'lodash';
import * as React from 'react';
import { concatObjectArrays } from '../../utils/object-utils';
import { StyleableProps, OperatingProps } from './props';

interface OperationButtonProps extends
  OperatingProps, StyleableProps {
    operatingKey: string,
    operatingName: string
}

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

export class OperationButton extends React.Component<OperationButtonProps, any>{
  isOperating(key: string, operating) {
    return _.includes(concatObjectArrays(operating), key);
  }
  isActionOperating(key: string, action: string, operating) {
    return _.includes(operating[action], key);
  }
  render() {
    const { className, operating, operatingKey, operatingName, children } = this.props;
    const loading = this.isActionOperating(operatingKey, operatingName, operating)
    const disabled = this.isOperating(operatingKey, operating);
    return (
      <Button {...this.props} className={className} loading={loading} disabled={disabled}>
        {children}
      </Button>
    );
  }
}
