import React from 'react';
import Album from './album';
import { withRouter } from 'react-router-dom';
import SearchBar from './searchBar';

class Favorite extends React.Component {
    constructor(props) {
        super(props);
        var favorites = window.API.getFavorites();
        this.state = { favorites: favorites };
    }
    //This 'filters' the favorites based on searchTerm
    filterFavorites = (searchTerm) => {
        this.setState({ searchTerm: searchTerm }, () => {
            this.setState({ favorites: window.API.getFavorites(searchTerm) })
        });
    }

    toggleFavorite = (albumId) => {
        window.API.toggleFavorite(albumId);
    }

    render() {
        
        var _favorites = this.state.favorites.map((album) =>
            <Album  
            key = {album.collectionId}
            toggleFavorite = {this.toggleFavorite}
            album = {album} 
            />);

        return (
            <div>
                <SearchBar
                handleOnChange = {this.filterFavorites}
                placeholder = 'Filter by artist name'
                styleClassName ='searchFavorite' />
                <div className="cards">
                    {_favorites}
                </div>
            </div>
        );
    }
}
export default withRouter(Favorite);
