import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { ActiveLinkProps } from './props';

const Route = require('react-router');

export const ActiveLink = connect(state => ({router: state.router}))(React.createClass<ActiveLinkProps, any>({
  render: function(){
    var path:string = _.get(this.props.router, 'location.pathname', '');
    var active:string = path === this.props.to ? 'active' : '';
    return (
      <Route.Link className={`item ${active}`} to={this.props.to}>
        {this.props.children}
      </Route.Link>
    );
  }
}));
