export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "ed4724e9eb243038b6318e509cc149af";
const tmdbEndPoint = "https://api.themoviedb.org/3/movie";
const MovieSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndPoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieSearch: (query, page) =>
    `${MovieSearch}/?api_key=${apiKey}&query=${query}&page=${page}`,
  getMovieDetail: (movieId) => `${tmdbEndPoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`,
  imgOriginal: (url) => `https://image.tmdb.org/t/p/original${url}`,
  imgW500: (url) => `https://image.tmdb.org/t/p/w500${url}`,
};
