import * as React from 'react';

interface SearchHubImageInputProps {
  value?: string
  searchImages: (options: any) => void;
}

class SearchHubImageInput extends React.Component<SearchHubImageInputProps, any>{
  search(event) {
    const keyword = event.target.value;
    if (event.keyCode == 13 && keyword) {
      const { searchImages } = this.props;
      searchImages({q: keyword});
    }
  }

  render() {
    return (
      <div className="ui fluid icon input">
        <input type="text"
          value={this.props.value}
          placeholder="Search Docker Registry images"
          onKeyDown={this.search.bind(this)} />
        <i className="search icon" />
      </div>
    );
  }
}

export default SearchHubImageInput;
