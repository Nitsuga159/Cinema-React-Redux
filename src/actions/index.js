const API_KEY = 'c685584',
  URL = 'https://www.omdbapi.com/';
export function addMovieFavourite(payload) {
  return {
    type: 'ADD_MOVIE_FAVOURITE',
    payload
  };
}

export function getMovieDetail(imdbID) {
  if(!imdbID) return {type: 'GET_MOVIE_DETAIL', payload: false}
  return dispatch => {
    fetch(`${URL}?apikey=${API_KEY}&i=${imdbID}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => dispatch({ type: 'GET_MOVIE_DETAIL', payload: json }))
  };
}

export function removeMovieFavourite(imdbID) {
  return {
    type: 'REMOVE_MOVIE_FAVOURITE',
    imdbID
  };
}

export function getMovies(titulo, page = 1) {
  if(!titulo) return {type: false};

  return dispatch => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${titulo}&page=${page}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => dispatch({ type: 'GET_MOVIES', payload: json, title: titulo }))
    .catch(res => dispatch({ type: 'GET_MOVIES', payload: res, title: titulo }));
  };
}

export function incrementPage() {
  return {
    type: 'INCREMENT_PAGE'
  }
}

export function decrementPage() {
  return {
    type: 'DECREMENT_PAGE'
  }
}

export function resetPage() {
  return {
    type: 'RESET_PAGE'
  }
}