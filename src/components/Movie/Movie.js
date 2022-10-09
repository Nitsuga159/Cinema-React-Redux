import React from 'react';
import { connect } from 'react-redux';
import { getMovieDetail } from '../../actions/index';
import notImage from '../../not-image.jpg'
import loader from '../../loader.svg'
import s from './Movie.module.css';

class Movie extends React.Component {

    componentDidMount() {
        let movieID = this.props.match.params.id;

        this.props.getMovieDetail(movieID);
    }

    componentWillUnmount() {
        this.props.getMovieDetail(false);
    }

    render() {
        if(this.props.movieDetail.isLoading) 
            return (
                <div  className={s['component-container']}>
                    <img className={s.loader} src={loader} alt='loader' />
                </div>
            );

        const { Title, Year, Genre, Director, Writer, Actors, Poster, BoxOffice, Plot, Ratings } = this.props.movieDetail;
        
        return (
            <div className={s['component-container']}>
                <div className={s['movie-container']}>
                    <h2 className={s.title}>{Title}</h2>
                        <div className={s.poster}>
                            <figure className={s['figure-poster']}>
                                <img src={Poster !== 'N/A' ? Poster : notImage} alt={Title} />
                                <figcaption className={s['figcaption-poster']}>
                                    <p>Recaudación: {BoxOffice || 'No definido'}</p>
                                    <p>Año: {Year}</p>
                                </figcaption>
                            </figure>
                        </div>
                        <div className={s.info}>
                            <p>Dirección: <b>{Director}</b></p>
                            <p>Guion: <b>{Writer}</b></p>
                            <p>Género: <b>{Genre}</b></p>
                            <p>Protagonistas: <b>{Actors}</b></p>
                            <h3>Sinopsis</h3>
                            <p className={s.sinopsis}>{Plot}</p>
                            <h3>Rating</h3>
                            <ul>
                                {
                                Ratings && Ratings.map(r => <li key={r.Source}>{r.Source}: 
                                                                <em className={s.rating}>{r.Value}</em>
                                                            </li>)
                                }
                            </ul>
                        </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        movieDetail: state.movieDetail
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMovieDetail: imdbID => dispatch(getMovieDetail(imdbID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);