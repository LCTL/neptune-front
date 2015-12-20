import * as _ from 'lodash';
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { concatObjectArrays } from '../../utils/object-utils';
import * as containerUtils from '../../utils/container-utils';
import * as containerActions from '../../actions/container-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import { CreateMachineContainerLink } from '../shared/links';
import MachineContainerTable from '../container/table';
import { ToggleShowAllContainersButton } from '../container/buttons';

@connect(
  state => ({
    machineName: state.router.params.machineName,
    machineIp: state.machine.ipsByName[state.router.params.machineName],
    containers: state.container.containersByMachineName[state.router.params.machineName],
    operating: state.container.operatingByMachineName[state.router.params.machineName],
    showAll: state.container.showAll
  }),
  dispatch => ({
    containerActions: bindActionCreators(containerActions, dispatch)
  }),
  (stateProps, dispatchProps) => _.assign({}, stateProps, {
    fetchContainerList: _.partial(
      dispatchProps.containerActions.fetchMachineContainerList,
      stateProps.machineName),
    startContainer: _.partial(
      dispatchProps.containerActions.startMachineContainer,
      stateProps.machineName),
    stopContainer: _.partial(
      dispatchProps.containerActions.stopMachineContainer,
      stateProps.machineName),
    removeContainer: _.partial(
      dispatchProps.containerActions.removeMachineContainer,
      stateProps.machineName),
    setShowAll: dispatchProps.containerActions.setShowAll,
    createHostUrl: containerUtils.hostUrlFnFactory(stateProps.machineIp),
    createContainerDetailPath:
      containerUtils.machineContainerDetailPathFnFactory(stateProps.machineName)
  })
)
class MachineContainersView extends React.Component<any, any>{
  componentWillMount() {
    const { showAll, fetchContainerList } = this.props;
    fetchContainerList({all: showAll});
  }

  componentWillReceiveProps(nextProps) {
    const { operating, showAll, fetchContainerList } = this.props;
    const currentOperating = concatObjectArrays(this.props.operating);
    const nextOperating = concatObjectArrays(nextProps.operating);
    if (currentOperating.length > nextOperating.length){
      fetchContainerList({all: showAll});
    }
  }

  render() {
    const {
      machineName,
      machineIp,
      operating,
      containers,
      showAll,
      fetchContainerList,
      startContainer,
      stopContainer,
      removeContainer,
      setShowAll,
      createHostUrl,
      createContainerDetailPath
    } = this.props;
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
            showAll={showAll}
            setShowAll={setShowAll}
            fetchContainerList={fetchContainerList}>
            {showAll ? 'Show Running' : 'Show All'}
          </ToggleShowAllContainersButton>
        </OneColumn>
        <CenterCircularHeader icon="grid">
          Containers
        </CenterCircularHeader>
        <br />
        <MachineContainerTable
          operating={operating}
          containers={containers}
          startContainer={startContainer}
          stopContainer={stopContainer}
          removeContainer={removeContainer}
          createHostUrl={createHostUrl}
          createContainerDetailPath={createContainerDetailPath} />
      </OneColumn>
    );
  }
}

export default MachineContainersView;
