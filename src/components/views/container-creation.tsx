import * as _ from 'lodash'
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createContainer } from '../../actions/container-actions';
import { fetchImageList } from '../../actions/image-actions';
import { OneColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers';
import Breadcrumb from '../shared/breadcrumb'
import ContainerCreationForm from '../container/creation-form';

@connect(
  state => ({
    router: state.router,
    autoCompleteImages: state.container.autoCompleteImages,
    operating: state.container.operating,
    showAllImage: state.image.showAll
  }),
  dispatch => ({
    createContainer: bindActionCreators(createContainer, dispatch),
    fetchImageList: bindActionCreators(fetchImageList, dispatch)
  })
)
class ContainerCreationView extends React.Component<any, any>{
  componentWillMount() {
    const { showAllImage, fetchImageList } = this.props;
    fetchImageList({all: showAllImage});
  }
  componentWillReceiveProps(nextProps) {
    const { history, operating } = this.props;
    if (operating.create && operating.create.length < nextProps.operating.create.length){
      history.pushState(null, `/containers`);
    }
  }
  render() {
    const { router, autoCompleteImages, createContainer } = this.props;
    return (
      <OneColumn>
        <HugeHeader icon="grid layout">
          Create Container
        </HugeHeader>
        <Breadcrumb router={router} />
        <br />
        <ContainerCreationForm
          autoCompleteImages={autoCompleteImages}
          createContainer={createContainer} />
      </OneColumn>
    )
  }
}

export default ContainerCreationView;
