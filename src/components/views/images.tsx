import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { concatObjectArrays } from '../../utils/object-utils';
import * as imageActions from '../../actions/image-actions';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers';
import Breadcrumb from '../shared/breadcrumb';
import { PullImageLink } from '../shared/links';
import ImageTable from '../image/table';
import { ToggleShowAllImageButton } from '../image/buttons';

@connect(
  state => ({
    router: state.router,
    images: state.image.images,
    operating: state.image.operating,
    showAll: state.image.showAll
  }),
  dispatch => ({
    imageActions: bindActionCreators(imageActions, dispatch)
  }),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    fetchImageList: dispatchProps.imageActions.fetchImageList,
    removeImage: dispatchProps.imageActions.removeImage,
    setShowAll: dispatchProps.imageActions.setShowAll
  })
)
class ImagesView extends React.Component<any, any>{
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
      router,
      images,
      showAll,
      setShowAll,
      fetchImageList,
      removeImage
    } = this.props;
    return (
      <OneColumn>
        <HugeHeader icon="file outline">
          Images
        </HugeHeader>
        <Breadcrumb router={router} />
        <OneColumn>
          <PullImageLink
            className="ui button basic blue right floated">
            <i className='arrow down icon'></i>
            Pull Image
          </PullImageLink>
          <ToggleShowAllImageButton
            className={`basic right floated ${showAll ? 'purple' : 'violet'}`}
            showAll={showAll}
            setShowAll={setShowAll}
            fetchImageList={fetchImageList}>
            {showAll ? 'Show Taged' : 'Show All'}
          </ToggleShowAllImageButton>
        </OneColumn>
        <ImageTable
          images={images}
          removeImage={removeImage} />
      </OneColumn>
    )
  }
}

export default ImagesView;
