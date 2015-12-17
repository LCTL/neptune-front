import * as _ from 'lodash';
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { concatObjectArrays } from '../../utils/object-utils';
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
    operating: state.container.operatingByMachineName[state.router.params.machineName],
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

  componentWillReceiveProps(nextProps) {
    const { machineName, operating, containerActions } = this.props;
    const currentOperating = concatObjectArrays(this.props.operating);
    const nextOperating = concatObjectArrays(nextProps.operating);
    if (currentOperating.length > nextOperating.length){
      containerActions.fetchMachineContainerList(machineName);
    }
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
        <MachineContainerTable
          machineName={machineName}
          containers={containersByName[machineName]}
          startMachineContainer={containerActions.startMachineContainer}
          stopMachineContainer={containerActions.stopMachineContainer} />
      </OneColumn>
    );
  }
}

export default MachineContainersView;
