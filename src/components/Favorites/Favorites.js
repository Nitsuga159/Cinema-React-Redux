import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { removeMovieFavourite } from "../../actions";
import s from './Favorites.module.css';
import notImage from '../../not-image.jpg'
import trash from '../../trash.svg'

export class ConnectedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  filterMovies = text => {
    const regExp = new RegExp(this.state.input, 'i');

    return regExp.test(text);
  }

  render() {
    const moviesFavourites = this.props.moviesFavourites;
    return (
      <div className={s['container-search']}>
        <h2 className={s['favourites-movies']}>Contenido Favorito</h2>
        <div className={s['filter-container']}>
          <input type='search' autoComplete="off" 
          onChange={e => this.setState({input: e.target.value})} value={this.state.input}
          placeholder='Filtrar contenido...' />
        </div>
        <ul className={s['list-movies']}>
          {
            moviesFavourites.filter(m => this.filterMovies(m.Title))
             .map(movie => <div key={movie.imdbID} className={s['movie-item']}>
             <NavLink to={`/movie/${movie.imdbID}`} className={s['movie-link']}>
               <figure>
                 <img src={movie.Poster !== 'N/A' ? movie.Poster : notImage} alt={movie.Title} />
                 <figcaption>{movie.Title}</figcaption>
                </figure>
             </NavLink>
             <img className={s.fill} src={trash}
             onClick={() => this.props.removeMovieFavourite(movie.imdbID)} 
              alt='trash' />
            </div>
            )
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    moviesFavourites: state.moviesFavourites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeMovieFavourite: imdbID => dispatch(removeMovieFavourite(imdbID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
