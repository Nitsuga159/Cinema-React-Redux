import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies, addMovieFavourite, incrementPage, decrementPage, resetPage } from "../../actions";
import { NavLink } from 'react-router-dom';
import s from './Buscador.module.css';
import notImage from '../../not-image.jpg'
import start from '../../start.svg'
import arrowLeft from '../../arrow-left.svg'
import arrowRight from '../../arrow-right.svg'


export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title
    };
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.state.title) return false;

    this.props.resetPage();
    this.props.getMovies(this.state.title)
  }

  render() {
    const { title } = this.state;
    const moviesFavourites = this.props.moviesFavourites;

    return (
      <div className={s['container-search']}>
        <h1 className={s['title']}>CATÁLOGO DE PELÍCULAS</h1>
        <h2 className={s['search-title']}>Título:</h2>
        <form className={s['form-container']} onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <input
              type="search"
              id="title"
              autoComplete="off"
              placeholder='ej: Fight Club...'
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
            <button type="submit" className={s['search-button']}>BUSCAR</button>
        </form>
        {this.props.movies && <div className={s.arrows}>
          <img src={arrowLeft}  onClick={() => {
              if(this.props.page === 1) return false;
              this.props.decrementPage();
              this.props.getMovies(this.state.title, this.props.page - 1)
            }
          } alt='retroceder' />
          <img src={arrowRight} onClick={() => {
              this.props.incrementPage();
              this.props.getMovies(this.state.title, this.props.page + 1)       
            }
          } alt='avanzar' />
        </div>}
        <ul className={this.props.movies ? s['list-movies'] : s['search-error']}>
          {
            this.props.movies ?  
            this.props.movies.map(movie => <div key={movie.imdbID} className={s['movie-item']}>
                      <NavLink to={`/movie/${movie.imdbID}`} className={s['movie-link']}>
                        <figure>
                          <img src={movie.Poster !== 'N/A' ? movie.Poster : notImage} alt={movie.Title} />
                          <figcaption>{movie.Title}</figcaption>
                        </figure>
                      </NavLink>
                      <img className={`${s.fill} ${moviesFavourites.some(m => m.imdbID === movie.imdbID) && s['fill-favourite']}`} src={start} alt='favourite'
                      onClick={() => {
                          this.props.addMovieFavourite({Title: movie.Title, imdbID: movie.imdbID, Poster: movie.Poster});
                        }
                      } 
                      />
                    </div>
                  ) :
            <h4>No se han registrado busquedas...</h4>
          }
        </ul>
        {this.props.movies && <div className={s.arrows}>
          <img src={arrowLeft}  onClick={() => {
              this.props.decrementPage();
              this.props.getMovies(this.state.title, this.props.page - 1)
            }
          } alt='retroceder' />
          <img src={arrowRight} onClick={() => {
              this.props.incrementPage();
              this.props.getMovies(this.state.title, this.props.page + 1)       
            }
          } alt='avanzar' />
        </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.moviesLoaded,
    moviesFavourites: state.moviesFavourites,
    title: state.title,
    page: state.page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovies: (titulo, page) => dispatch(getMovies(titulo, page)),
    incrementPage: () => dispatch(incrementPage()),
    decrementPage: () => dispatch(decrementPage()),
    resetPage: () => dispatch(resetPage()),
    addMovieFavourite: (payload) => dispatch(addMovieFavourite(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
