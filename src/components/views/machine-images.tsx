import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { concatObjectArrays } from '../../utils/object-utils';
import * as imageActions from '../../actions/image-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import { PullMachineImageLink } from '../shared/links';
import ImageTable from '../image/table';
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
  }),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    fetchImageList: _.partial(
      dispatchProps.imageActions.fetchMachineImageList,
      stateProps.machineName
    ),
    removeImage: _.partial(
      dispatchProps.imageActions.removeMachineImage,
      stateProps.machineName
    ),
    setShowAll: dispatchProps.imageActions.setShowAll
  })
)
class MachineImagesView extends React.Component<any, any>{
  componentWillMount() {
    const { images, showAll, fetchImageList } = this.props;
    if (_.isEmpty(images)) {
      fetchImageList({all: showAll});
    }
  }

  componentWillReceiveProps(nextProps) {
    const { operating, showAll, fetchImageList } = this.props;
    const currentOperating = concatObjectArrays(operating);
    const nextOperating = concatObjectArrays(nextProps.operating);
    if (currentOperating.length > nextOperating.length){
      fetchImageList({all: showAll});
    }
  }

  render() {
    const {
      machineName,
      images,
      showAll,
      setShowAll,
      fetchImageList,
      removeImage
    } = this.props;
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
            showAll={showAll}
            setShowAll={setShowAll}
            fetchImageList={fetchImageList}>
            {showAll ? 'Show Taged' : 'Show All'}
          </ToggleShowAllImageButton>
        </OneColumn>
        <CenterCircularHeader icon="file image outline">
          Images
        </CenterCircularHeader>
        <br />
        <ImageTable
          images={images}
          removeImage={removeImage} />
      </OneColumn>
    )
  }
}

export default MachineImagesView;
