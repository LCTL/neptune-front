import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as containerActions from '../../actions/container-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import { CreateMachineContainerLink } from '../shared/links';
import MachineContainerTable from '../container/table';

@connect(
  state => ({
    containersByName: state.container.containersByMachineName
  }),
  dispatch => ({
    containerActions: bindActionCreators(containerActions, dispatch)
  })
)
class MachineContainersView extends React.Component<any, any>{
  componentWillMount() {
    const machineName = this.props.params.machineName;
    this.props.containerActions.fetchMachineContainerList(machineName, {all: true});
  }

  render() {
    const machineName = this.props.params.machineName;
    const { containersByName } = this.props;
    return (
      <OneColumn>
        <OneColumn>
          <CreateMachineContainerLink
            machineName={machineName}
            className="ui button basic blue right floated">
            <i className='plus icon'></i>
            Create Container
          </CreateMachineContainerLink>
        </OneColumn>
        <CenterCircularHeader icon="grid">
          Containers
        </CenterCircularHeader>
        <br />
        <MachineContainerTable containers={containersByName[machineName]} />
      </OneColumn>
    );
  }
}

export default MachineContainersView;
