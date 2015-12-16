import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMachineImage } from '../../actions/image-actions';
import { searchImages } from '../../actions/registry-actions';
import { OneColumn, TwoColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import SearchInput from '../image/search-registry-image-input';
import SearchResultTable from '../image/registry-image-table';
import MachinePullImageForm from '../image/pull-image-form';
import { LoadMoreRegistryImageButton } from '../image/buttons';

@connect(
  state => ({
    machineName: state.router.params.machineName,
    search: state.registry.search,
  }),
  dispatch => ({
    createMachineImage: bindActionCreators(createMachineImage, dispatch),
    searchImages: bindActionCreators(searchImages, dispatch)
  })
)
class MachineContainerCreationView extends React.Component<any, any>{
  render() {
    const { machineName, search, history, createMachineImage, searchImages } = this.props;
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
          createMachineImage={createMachineImage} />
        <br />
        <div className="ui horizontal divider">Or</div>
        <br />
        <SearchInput searchImages={searchImages} />
        {
          (() => {
            if (search.results) {
              return (
                <SearchResultTable
                  images={search.results}
                  machineName={machineName}
                  createMachineImage={createMachineImage} />
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
      </OneColumn>
    )
  }
}

export default MachineContainerCreationView;
