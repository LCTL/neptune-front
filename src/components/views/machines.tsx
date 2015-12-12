import * as _ from 'lodash';
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as action from '../../actions/machine-actions';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers';
import Breadcrumb from '../shared/breadcrumb'
import MachineTable from '../machine/table';

@connect(
  (state) => ({
    router: state.router,
    machines: state.machine.machinesByName,
    operating: state.machine.operating
  }),
  (dispatch) => ({
    machineActions: bindActionCreators(action, dispatch)
  }))
class Machines extends React.Component<any, any>{
  _concatOperating (props) {
    let result: string[] = [];
    _.values(props.operating).forEach((arr: string[]) => result = result.concat(arr));
    return result;
  }

  componentWillMount() {
    if (_.isEmpty(this.props.machines)) {
      this.props.machineActions.fetchList();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { machineActions, operating } = this.props;
    const currentOperating = this._concatOperating(this.props);
    const nextOperating = this._concatOperating(nextProps);
    if (currentOperating.length > nextOperating.length){
      machineActions.fetchList();
    }
  }

  render() {
    return (
      <OneColumn>
        <HugeHeader icon="server">
          Machines
        </HugeHeader>
        <Breadcrumb router={this.props.router} />
        <MachineTable {...this.props} />
      </OneColumn>
    );
  }
}

export default Machines;
