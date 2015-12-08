import * as _ from 'lodash';
import * as Reflux from 'reflux';
import * as React from 'react';
import { RouteStore } from '../../stores/route-store';
import { ActiveLinkProps } from './props';

const Route = require('react-router');

export const ActiveLink = React.createClass<ActiveLinkProps, any>({
  mixins: [Reflux.connect(RouteStore, 'route')],
  render: function(){
    var path:string = _.get(this.state.route, 'location.pathname', '');
    var active:string = path === this.props.to ? 'active' : '';
    return (
      <Route.Link className={`item ${active}`} to={this.props.to}>
        {this.props.children}
      </Route.Link>
    );
  }
});
