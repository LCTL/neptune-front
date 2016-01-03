import * as _ from 'lodash';
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { concatObjectArrays } from '../../utils/object-utils';
import * as containerUtils from '../../utils/container-utils';
import * as containerActions from '../../actions/container-actions';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers';
import Breadcrumb from '../shared/breadcrumb'
import { Loader } from '../shared/loaders';
import MachineContainerTable from '../container/table';
import { ToggleShowAllContainersButton } from '../container/buttons';

@connect(
  state => ({
    router: state.router,
    containers: state.container.containers,
    operating: state.container.operating,
    showAll: state.container.showAll
  }),
  dispatch => ({
    containerActions: bindActionCreators(containerActions, dispatch)
  }),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    fetchContainerList: dispatchProps.containerActions.fetchContainerList,
    startContainer: dispatchProps.containerActions.startContainer,
    stopContainer: dispatchProps.containerActions.stopContainer,
    removeContainer: dispatchProps.containerActions.removeContainer,
    setShowAll: dispatchProps.containerActions.setShowAll,
    createHostUrl: containerUtils.hostUrlFnFactory('127.0.0.1'),
    createContainerDetailPath:
      containerUtils.localContainerDetailPathFnFactory()
  })
)
class ContainersView extends React.Component<any, any>{
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
      router,
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
        <HugeHeader icon="grid layout">
          Containers
        </HugeHeader>
        <Breadcrumb router={router} />
        <OneColumn>
          <OneColumn>
            <ToggleShowAllContainersButton
              className={`basic right floated ${showAll ? 'purple' : 'violet'}`}
              showAll={showAll}
              setShowAll={setShowAll}
              fetchContainerList={fetchContainerList}>
              {showAll ? 'Show Running' : 'Show All'}
            </ToggleShowAllContainersButton>
          </OneColumn>
          <MachineContainerTable
            operating={operating}
            containers={containers}
            startContainer={startContainer}
            stopContainer={stopContainer}
            removeContainer={removeContainer}
            createHostUrl={createHostUrl}
            createContainerDetailPath={createContainerDetailPath} />
        </OneColumn>
      </OneColumn>
    );
  }
}

export default ContainersView;
