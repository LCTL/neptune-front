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
  })
)
class MachineContainerCreationView extends React.Component<any, any>{
  render() {
    const {
      machineName,
      search,
      history,
      pulling,
      searching,
      pullMachineImage,
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
          history={history}
          machineName={machineName}
          pullMachineImage={pullMachineImage} />
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
                    machineName={machineName}
                    pulling={pulling}
                    pullMachineImage={pullMachineImage} />
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

export default MachineContainerCreationView;
