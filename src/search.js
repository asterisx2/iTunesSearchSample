import React, { Component } from 'react';
import Album from './album';
import SearchBar from './searchBar';
import { withRouter } from 'react-router-dom';

class Search extends Component {
  
    constructor(props) {
        super(props);
        //'searchStatus' is used to decide what to display
        this.state = { searchStatus: 'NoSearch' };
    }
    componentDidMount() {
        //Populate some random albums on component load
        var _randomCharacter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        window.API.searchAlbums(_randomCharacter, this.searchSuccessful, this.handleError);
    }

    searchSuccessful = (data) => {
        this.setState({ albums: data, searchStatus: 'Complete' });
    }

    handleError = (data) => {
        this.setState({ error: data, searchStatus: 'Error' });
    }

    handleSearch = (value) => {
        this.setState({ searchTerm: value, searchStatus: 'Searching' }, () => {
          window.API.searchAlbums(this.state.searchTerm, this.searchSuccessful, this.handleError);
        })
    }

    toggleFavorite = (albumId) => {
        window.API.toggleFavorite(albumId);
    }
    
    renderConditional(searchStatus)
    {
      //'searchStatus' is used to decide what to display
      //{searchStatus = NoSearch} => component was freshly loaded. Show searchbar and load random results.
      //{searchStatus = Searching} => The API has been called to perform a search and the component is waiting for its callbacks to be invoked. Showing 'Searching for albums...' text.
      //{searchStatus = Complete} => A successful search was completed. Display results.
      //{searchStatus = Error} => There was an error. Show error.
      switch (searchStatus) {

          case 'NoSearch':
           return null;

          case 'Searching':
            return <span className="searching">Searching albums for <span>{this.state.searchTerm + '...'}</span></span>;

          case 'Complete':
            return this.state.albums.map((album) =>
                <Album 
                key={album.collectionId} 
                album={album} 
                toggleFavorite={this.toggleFavorite} />);

          case 'Error':
            return <div className="error"><i className="fa fa-exclamation-triangle errorSymbol"></i>{this.state.error}</div>;

            default:
              break;

      };
    }

    render() {
        return <div>
                <SearchBar
                handleSubmit = {this.handleSearch}
                searchHeading = 'Search for your favorite artists'
                styleClassName = 'search' />
                <div className = "cards">{this.renderConditional(this.state.searchStatus)}</div>
              </div>;
    }
}
export default withRouter(Search);