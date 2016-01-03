import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pullImage } from '../../actions/image-actions';
import { searchImages } from '../../actions/registry-actions';
import { OneColumn, TwoColumn } from '../shared/grids';
import { HugeHeader } from '../shared/headers';
import Breadcrumb from '../shared/breadcrumb'
import { Loader } from '../shared/loaders';
import SearchInput from '../image/search-registry-image-input';
import SearchResultTable from '../image/registry-image-table';
import MachinePullImageForm from '../image/pull-image-form';
import { LoadMoreRegistryImageButton } from '../image/buttons';

@connect(
  state => ({
    router: state.router,
    search: state.registry.search,
    pulling: state.image.operating.pull,
    searching: state.registry.operating.search
  }),
  dispatch => ({
    pullImage: bindActionCreators(pullImage, dispatch),
    searchImages: bindActionCreators(searchImages, dispatch)
  }),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    pullImage: dispatchProps.pullImage,
    searchImages: dispatchProps.searchImages
  })
)
class PullImageView extends React.Component<any, any>{
  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (this.props.pulling.length < nextProps.pulling.length){
      history.pushState(null, `/images`);
    }
  }
  render() {
    const {
      router,
      search,
      pulling,
      searching,
      pullImage,
      searchImages
    } = this.props;
    var options = {}
    var result = []
    return (
      <OneColumn>
        <HugeHeader icon="file outline">
          Pull Image
        </HugeHeader>
        <Breadcrumb router={router} />
        <MachinePullImageForm
          pullImage={pullImage} />
        <br />
        <div className="ui horizontal divider">Or</div>
        <br />
        <OneColumn>
          <SearchInput searchImages={searchImages} />
          {
            (() => {
              if (search.results) {
                return (
                  <SearchResultTable
                    images={search.results}
                    pulling={pulling}
                    pullImage={pullImage} />
                )
              }
            })()
          }
          {
            (() => {
              if (search.page && search.num_pages && search.page < search.num_pages) {
                const page = parseInt(search.page) + 1;
                return (
                  <LoadMoreRegistryImageButton
                    className="fluid basic blue"
                    query={search.query}
                    page={page}
                    searchImages={searchImages} />
                )
              }
            })()
          }
          <Loader active={searching} dimmerClassName="inverted" />
        </OneColumn>
      </OneColumn>
    )
  }
}

export default PullImageView;
