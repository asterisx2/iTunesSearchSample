import React from 'react';
class Album extends React.Component {
  constructor(props) {

    super(props);
    
    //Check if album is favorite
    //Assign the appropriate class to the heart
    var classForFavoriteButton = "favorite-btn ";
    if (this.props.album.isFavorite)
      classForFavoriteButton += "fa fa-heart";
    else
      classForFavoriteButton += "fa fa-heart-o";

    //Saved to state because clicking would need to
    //change the icon of heart
    this.state = {
      classForFavoriteButton: classForFavoriteButton
    };

  }
  getSrcSet = (artworkUrl100) => 
  {
    var artworkUrl = artworkUrl100.replace('100x100bb.jpg', '');

    var artwork1x = artworkUrl + '200x200bb.jpg 1x';
    var artwork2x = artworkUrl + '400x400bb.jpg 2x';
    var artwork4x = artworkUrl + '800x800bb.jpg 4x';
    var artwork8x = artworkUrl + '1600x1600bb.jpg 8x';

    return artwork1x + ", " + artwork2x + ", " + artwork4x + ", " + artwork8x;
  }
  handleFavoriteClick = () => 
  {
    //Toggle the favorite 
    this.props.toggleFavorite(this.props.album.collectionId);
    
    //Change the class and the state
    var cls = this.state.classForFavoriteButton.toString();
    if (cls.indexOf('fa fa-heart-o') !== -1)
      this.setState({ classForFavoriteButton: "favorite-btn fa fa-heart" });
    else
      this.setState({ classForFavoriteButton: "favorite-btn fa fa-heart-o" });
  }
  render() {
    return (
      <div className="thecard">
        <div className="card-img">
          <div className="tracks">{this.props.album.trackCount} <i className="fa fa-music music-icon"></i></div>
          <span className="price">${this.props.album.collectionPrice}</span>
          <img srcSet={this.getSrcSet(this.props.album.artworkUrl100)} alt={this.props.album.collectionName} />
        </div>
        <div className="card-caption">
          <i className={this.state.classForFavoriteButton} ref={(elem) => this.elem = elem} onClick={() => this.handleFavoriteClick()}></i>
          <span className="date">{new Date(this.props.album.releaseDate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <h1 className="album-name">{this.props.album.collectionName}</h1>
          <span className="genre">Genre: {this.props.album.primaryGenreName}</span>
          <h3 className="artistName">By: {this.props.album.artistName}</h3>
        </div>
      </div>
    );
  };
}
export default Album;
