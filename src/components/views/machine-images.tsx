import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { concatObjectArrays } from '../../utils/object-utils';
import * as imageActions from '../../actions/image-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import { PullMachineImageLink } from '../shared/links';
import MachineImageTable from '../image/table';
import { ToggleShowAllImageButton } from '../image/buttons';

@connect(
  state => ({
    machineName: state.router.params.machineName,
    images: state.image.imagesByMachineName[state.router.params.machineName],
    operating: state.image.operatingByMachineName[state.router.params.machineName],
    showAll: state.image.showAll
  }),
  dispatch => ({
    imageActions: bindActionCreators(imageActions, dispatch)
  })
)
class MachineImagesView extends React.Component<any, any>{
  componentWillMount() {
    const { machineName, images, showAll, imageActions } = this.props;
    if (_.isEmpty(images)) {
      imageActions.fetchMachineImageList(machineName, {all: showAll});
    }
  }

  componentWillReceiveProps(nextProps) {
    const { machineName, operating, showAll, imageActions } = this.props;
    const currentOperating = concatObjectArrays(operating);
    const nextOperating = concatObjectArrays(nextProps.operating);
    if (currentOperating.length > nextOperating.length){
      imageActions.fetchMachineImageList(machineName, {all: showAll});
    }
  }

  render() {
    const { machineName, images, showAll, imageActions } = this.props;
    return (
      <OneColumn>
        <OneColumn>
          <PullMachineImageLink
            machineName={machineName}
            className="ui button basic blue right floated">
            <i className='arrow down icon'></i>
            Pull Image
          </PullMachineImageLink>
          <ToggleShowAllImageButton
            className={`basic right floated ${showAll ? 'purple' : 'violet'}`}
            machineName={machineName}
            showAll={showAll}
            setShowAll={imageActions.setShowAll}
            fetchMachineImageList={imageActions.fetchMachineImageList}>
            {showAll ? 'Show Taged' : 'Show All'}
          </ToggleShowAllImageButton>
        </OneColumn>
        <CenterCircularHeader icon="file image outline">
          Images
        </CenterCircularHeader>
        <br />
        <MachineImageTable images={images} />
      </OneColumn>
    )
  }
}

export default MachineImagesView;
