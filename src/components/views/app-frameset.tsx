import * as React from 'react';
import { TopMenu } from '../shared/menus'
const { Divider } = require('react-semantify');

export default React.createClass<any, any>({
  render: function() {
    return (
      <div className="ui container">
        <TopMenu />
        <Divider className="bottom-space" />
        {this.props.children}
      </div>
    );
  }
});
