import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { PATH_INFOS } from '../../constants/path';

const ReactRouter = require('react-router')
const Semantify = require('react-semantify');

const Divider = React.createClass<any, any>({
  render: function() {
    return (
      <i className="right angle icon divider"></i>
    )
  }
})

export const Breadcrumb = connect(state => ({router: state.router}))(React.createClass<any, any>({
  _dynamicComponents: function () {
    var router = this.props.router;
    var pathInfos = PATH_INFOS;
    var components = []
    if (!(_.isEmpty(router) || _.isEmpty(pathInfos))) {
      let pathname = router.location.pathname;
      let currentPath = '';
      let paths = pathname.split('/').filter(path => path !== '').map(path => '/' + path);

      paths.unshift('/');
      paths.forEach((path, pindex) => {
        currentPath += path;
        currentPath = currentPath.replace(/\/\//, '/');
        pathInfos.forEach(info => {
          if (info.path.test(currentPath)){
            var label = _.isFunction(info.dynamicLabel) ? info.dynamicLabel(router) : info.label;
            if (pindex > 0) {
              components.push((
                <Divider />
              ));
            }
            if (pindex === paths.length - 1) {
              components.push((
                <div className="active section">{label}</div>
              ));
            } else {
              components.push((
                <ReactRouter.Link to={currentPath}>{label}</ReactRouter.Link>
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
}));
