import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as imageActions from '../../actions/image-actions';
import { OneColumn } from '../shared/grids';
import { CenterCircularHeader } from '../shared/headers';
import { PullMachineImageLink } from '../shared/links';
import MachineImageTable from '../image/table';

@connect(
  state => ({
    machineName: state.router.params.machineName,
    imagesByName: state.image.imagesByMachineName
  }),
  dispatch => ({
    imageActions: bindActionCreators(imageActions, dispatch)
  })
)
class MachineImagesView extends React.Component<any, any>{
  componentWillMount() {
    const { machineName, imageActions } = this.props;
    imageActions.fetchMachineImageList(machineName, {all: true});
  }

  render() {
    const { machineName, imagesByName } = this.props;
    return (
      <OneColumn>
        <OneColumn>
          <PullMachineImageLink
            machineName={machineName}
            className="ui button basic blue right floated">
            <i className='arrow down icon'></i>
            Pull Image
          </PullMachineImageLink>
        </OneColumn>
        <CenterCircularHeader icon="file image outline">
          Images
        </CenterCircularHeader>
        <br />
        <MachineImageTable images={imagesByName[machineName]} />
      </OneColumn>
    )
  }
}

export default MachineImagesView;
