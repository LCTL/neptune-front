import * as _ from 'lodash'
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMachineContainer } from '../../actions/container-actions';
import { fetchMachineImageList } from '../../actions/image-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import ContainerCreationForm from '../container/creation-form';

@connect(
  state => ({
    machineName: state.router.params.machineName,
    autoCompleteImages: state.container.autoCompleteImagesByMachineName[state.router.params.machineName],
    operating: state.container.operatingByMachineName[state.router.params.machineName],
    showAllImage: state.image.showAll
  }),
  dispatch => ({
    createMachineContainer: bindActionCreators(createMachineContainer, dispatch),
    fetchMachineImageList: bindActionCreators(fetchMachineImageList, dispatch)
  }),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    createContainer: _.partial(dispatchProps.createMachineContainer, stateProps.machineName),
    fetchImageList: _.partial(dispatchProps.fetchMachineImageList, stateProps.machineName)
  })
)
class MachineContainerCreationView extends React.Component<any, any>{
  componentWillMount() {
    const { showAllImage, fetchImageList } = this.props;
    fetchImageList({all: showAllImage});
  }
  componentWillReceiveProps(nextProps) {
    const { machineName, history, operating } = this.props;
    if (this.props.operating.create.length < nextProps.operating.create.length){
      history.pushState(null, `/machines/${machineName}/containers`);
    }
  }
  render() {
    const { history, autoCompleteImages, createContainer } = this.props;
    return (
      <OneColumn>
        <CenterCircularHeader icon="grid layout">
          Create Container
        </CenterCircularHeader>
        <ContainerCreationForm
          autoCompleteImages={autoCompleteImages}
          createContainer={createContainer} />
      </OneColumn>
    )
  }
}

export default MachineContainerCreationView;
