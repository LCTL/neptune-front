import * as React from 'react';
import { connect } from 'react-redux';
import { TopMenu } from '../shared/menus'
const { Divider } = require('react-semantify');

@connect(state => ({
  router: state.router
}))
class AppFrameset extends React.Component<any, any>{
  render() {
    return (
      <div className="ui container">
        <TopMenu router={this.props.router} />
        <Divider className="bottom-space" />
        {this.props.children}
      </div>
    );
  }
}

export default AppFrameset;
