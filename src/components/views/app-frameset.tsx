import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { AsyncErrorWrapper } from '../../constants/interfaces';
import { TopMenu } from '../shared/menus'
import { CommonProps } from '../shared/props';
const { Divider } = require('react-semantify');
const notie = require('notie');

interface AsyncErrorNotifyerProps extends CommonProps {
  asyncErrors: AsyncErrorWrapper[]
}

class AsyncErrorNotifyer extends React.Component<AsyncErrorNotifyerProps, any>{
  componentWillReceiveProps(nextProps) {
    if (this.props.asyncErrors.length < nextProps.asyncErrors.length) {
      const warppers: AsyncErrorWrapper[] = nextProps.asyncErrors;
      const wrapper:AsyncErrorWrapper = _.last(warppers);
      notie.alert(3, wrapper.error.message, 30);
    }
  }
  render() {
    return (
      <noscript />
    );
  }
};

@connect(state => ({
  asyncErrors: state.error.asyncErrors,
  router: state.router
}))
class AppFrameset extends React.Component<any, any>{
  render() {
    const { asyncErrors, router } = this.props;
    return (
      <div className="ui container">
        <AsyncErrorNotifyer asyncErrors={asyncErrors} />
        <TopMenu router={router} />
        <Divider className="bottom-space" />
        {this.props.children}
      </div>
    );
  }
}

export default AppFrameset;
