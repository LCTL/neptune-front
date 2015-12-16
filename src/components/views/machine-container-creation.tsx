import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMachineContainer } from '../../actions/container-actions';
import { fetchMachineImageList } from '../../actions/image-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import MachineContainerCreationForm from '../container/creation-form';

@connect(
  state => ({
    machineName: state.router.params.machineName,
    autoCompleteImages: state.container.autoCompleteImagesByMachineName[state.router.params.machineName],
    showAllImage: state.image.showAll
  }),
  dispatch => ({
    createMachineContainer: bindActionCreators(createMachineContainer, dispatch),
    fetchMachineImageList: bindActionCreators(fetchMachineImageList, dispatch)
  })
)
class MachineContainerCreationView extends React.Component<any, any>{
  componentWillMount() {
    const { machineName, showAllImage, fetchMachineImageList } = this.props;
    fetchMachineImageList(machineName, {all: showAllImage});
  }
  render() {
    const { machineName, history, autoCompleteImages, createMachineContainer } = this.props;
    return (
      <OneColumn>
        <CenterCircularHeader icon="grid layout">
          Create Container
        </CenterCircularHeader>
        <MachineContainerCreationForm
          machineName={machineName}
          history={history}
          autoCompleteImages={autoCompleteImages}
          createMachineContainer={createMachineContainer} />
      </OneColumn>
    )
  }
}

export default MachineContainerCreationView;
