import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pullMachineImage } from '../../actions/image-actions';
import { searchImages } from '../../actions/registry-actions';
import { OneColumn, TwoColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import { Loader } from '../shared/loaders';
import SearchInput from '../image/search-registry-image-input';
import SearchResultTable from '../image/registry-image-table';
import MachinePullImageForm from '../image/pull-image-form';
import { LoadMoreRegistryImageButton } from '../image/buttons';

@connect(
  state => ({
    machineName: state.router.params.machineName,
    search: state.registry.search,
    pulling: state.image.operatingByMachineName[state.router.params.machineName].pull,
    searching: state.registry.operating.search
  }),
  dispatch => ({
    pullMachineImage: bindActionCreators(pullMachineImage, dispatch),
    searchImages: bindActionCreators(searchImages, dispatch)
  }),
  (stateProps, dispatchProps, ownProps) => _.assign({}, stateProps, ownProps, {
    pullImage: _.partial(dispatchProps.pullMachineImage, stateProps.machineName),
    searchImages: dispatchProps.searchImages
  })
)
class MachinePullImageView extends React.Component<any, any>{
  componentWillReceiveProps(nextProps) {
    const { machineName, history } = this.props;
    if (this.props.pulling.length < nextProps.pulling.length){
      history.pushState(null, `/machines/${machineName}/images`);
    }
  }
  render() {
    const {
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
        <CenterCircularHeader icon="file image outline">
          Pull Image
        </CenterCircularHeader>
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

export default MachinePullImageView;
