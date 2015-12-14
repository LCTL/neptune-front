import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as containerActions from '../../actions/container-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import { CreateMachineContainerLink } from '../shared/links';
import MachineContainerTable from '../container/table';
import { ToggleShowAllContainersButton } from '../container/buttons';

@connect(
  state => ({
    machineName: state.router.params.machineName,
    containersByName: state.container.containersByMachineName,
    showAll: state.container.showAll
  }),
  dispatch => ({
    containerActions: bindActionCreators(containerActions, dispatch)
  })
)
class MachineContainersView extends React.Component<any, any>{
  componentWillMount() {
    const { machineName, showAll, containerActions } = this.props;
    containerActions.fetchMachineContainerList(machineName, {all: showAll});
  }

  render() {
    const { machineName, containersByName, showAll, containerActions } = this.props;
    return (
      <OneColumn>
        <OneColumn>
          <CreateMachineContainerLink
            machineName={machineName}
            className="ui button basic blue right floated">
            <i className='plus icon'></i>
            Create Container
          </CreateMachineContainerLink>
          <ToggleShowAllContainersButton
            className={`basic right floated ${showAll ? 'purple' : 'violet'}`}
            machineName={machineName}
            showAll={showAll}
            setShowAll={containerActions.setShowAll}
            fetchMachineContainerList={containerActions.fetchMachineContainerList}>
            {showAll ? 'Show Running' : 'Show All'}
          </ToggleShowAllContainersButton>
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
