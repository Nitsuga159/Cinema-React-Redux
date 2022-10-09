const initialState = {
  moviesFavourites: [],
  moviesLoaded: false,
  movieDetail: {isLoading: true},
  title: '',
  page: 1
};

export default function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_MOVIE_FAVOURITE': 
      if(state.moviesFavourites.some(movie => movie.imdbID === action.payload.imdbID)) return {...state};
      return {
        ...state,
        moviesFavourites: [...state.moviesFavourites, action.payload]
      };
    case 'GET_MOVIES':
      return {
        ...state,
        moviesLoaded: action.payload.Search,
        title: action.title,
      };
    case 'DECREMENT_PAGE':
      return {
        ...state,
        page: state.page - 1
      };
    case 'INCREMENT_PAGE':
      return {
        ...state,
        page: state.page + 1
      };
    case 'RESET_PAGE':
      return {
        ...state,
        page: 1
      };
    case 'GET_MOVIE_DETAIL':
      if(!action.payload) return {...state, movieDetail: {isLoading: true}}
      return {
        ...state,
        movieDetail: action.payload
      };
    case 'REMOVE_MOVIE_FAVOURITE':
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.filter(movie => movie.imdbID !== action.imdbID)
      };

    default: return {...state};
  }
}