import * as _ from 'lodash';
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AsyncErrorWrapper } from '../../constants/interfaces';
import { abortComplete } from '../../actions/http-request-actions';
import { TopMenu } from '../shared/menus'
import { CommonProps } from '../shared/props';
const { Divider } = require('react-semantify');
const notie = require('notie');

interface AsyncErrorNotifyerProps extends CommonProps {
  asyncErrors: AsyncErrorWrapper[]
}

interface HttpRequestAbortHandlerProps extends CommonProps {
  requests: any,
  requestIds: string[],
  abortComplete: (id: string) => void
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

class HttpRequestAbortHandler extends React.Component<HttpRequestAbortHandlerProps, any>{
  componentWillReceiveProps(nextProps) {
    nextProps.requestIds.forEach(id => {
      if (nextProps.requests[id]) {
        nextProps.requests[id].abort();
        nextProps.abortComplete(id);
      }
    })
  }
  render() {
    return (
      <noscript />
    );
  }
}

@connect(
  state => ({
    asyncErrors: state.error.asyncErrors,
    router: state.router,
    requests: state.httpRequest.requestsById,
    requestIds: state.httpRequest.requestIdsForAbort
  }),
  dispatch => ({
    abortComplete: bindActionCreators(abortComplete, dispatch)
  })
)
class AppFrameset extends React.Component<any, any>{
  render() {
    const { asyncErrors, router, requests, requestIds, abortComplete } = this.props;
    return (
      <div className="ui container">
        <AsyncErrorNotifyer asyncErrors={asyncErrors} />
        <HttpRequestAbortHandler requests={requests} requestIds={requestIds} abortComplete={abortComplete} />
        <TopMenu router={router} />
        <Divider className="bottom-space" />
        {this.props.children}
      </div>
    );
  }
}

export default AppFrameset;
