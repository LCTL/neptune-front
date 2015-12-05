import * as _ from 'lodash';
import * as React from 'react';
import * as Reflux from 'reflux';
import { RouteStore, PathInfoStore } from '../stores/route-store';

const ReactRouter = require('react-router')
const Semantify = require('react-semantify');

const Divider = React.createClass<any, any>({
  render: function() {
    return (
      <i className="right angle icon divider"></i>
    )
  }
})

export const Breadcrumb = React.createClass<any, any>({
  mixins: [
    Reflux.connect(RouteStore, 'route'),
    Reflux.connect(PathInfoStore, 'pathInfos'),
  ],
  _dynamicComponents: function () {
    var route = this.state.route;
    var pathInfos = this.state.pathInfos;
    var components = []
    if (!(_.isEmpty(route) || _.isEmpty(pathInfos))) {
      let pathname = route.location.pathname;
      let currentPath = '';
      let paths = pathname.split('/').filter(path => path !== '').map(path => '/' + path);

      paths.unshift('/');
      paths.forEach((path, pindex) => {
        currentPath += path;
        currentPath = currentPath.replace(/\/\//, '/');
        pathInfos.forEach(info => {
          if (info.path.test(currentPath)){
            if (pindex > 0) {
              components.push((
                <Divider />
              ));
            }
            if (pindex === paths.length - 1) {
              components.push((
                <div className="active section">{info.label}</div>
              ));
            } else {
              components.push((
                <ReactRouter.Link to={currentPath}>{info.label}</ReactRouter.Link>
              ));
            }
          }
        });
      })
    }
    return components
  },
  render: function() {
    return (
      <Semantify.Breadcrumb className="top">
        {this._dynamicComponents()}
      </Semantify.Breadcrumb>
    )
  }
});
