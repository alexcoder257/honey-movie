const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
  },
};
export const MovieApi = {
  getTrendingMovie: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/trending/movie/week`,
      options
    );
    return res.json();
  },
  getMovieByGenres: async function (genre_id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/discover/movie?with_genres=${genre_id}`,
      options
    );
    return res.json();
  },
  getListGenres: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/genre/movie/list`,
      options
    );
    return res.json();
  },
  getNowPlayingMovie: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/now_playing`,
      options
    );
    return res.json();
  },
  getPopularMovie: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/popular`,
      options
    );
    return res.json();
  },
  getTopRatedMovie: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/top_rated`,
      options
    );
    return res.json();
  },
  getUpcomingMovie: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/upcoming`,
      options
    );
    return res.json();
  },
  getDetailMovie: async function (movie_id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${movie_id}`,
      options
    );
    return res.json();
  },
  searchMovie: async function (query: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/movie?query=${query}`,
      options
    );
    return res.json();
  },
  getUrlMovie: async function(id:Number){
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}/videos`,
      options
    );
    return res.json()
  },
  getSimilarMovie:async function(id:Number){
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}/similar`,
      options
    );
    return res.json()
  }
};

export const TVSeriesApi = {
  getTrendingTV: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/trending/tv/week`,
      options
    );
    return res.json();
  },
  searchTVSeries: async function (query: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/tv?query=${query}`,
      options
    );
    return res.json();
  },
  getAiringToday: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tv/airing_today`,
      options
    );
    return res.json();
  },
  getOnTheAirTV: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tv/on_the_air`,
      options
    );
    return res.json();
  },
  getPopularTV: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tv/popular`,
      options
    );
    return res.json();
  },
  getTopRatedTV: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tv/top_rated`,
      options
    );
    return res.json();
  },
  getDetailTVSerie: async function (series_id: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tv/${series_id}`,
      options
    );
    return res.json();
  },
  getUrlTV: async function(id:Number){
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tv/${id}/videos`,
      options
    );
    return res.json()
  },
  getSimilarTV:async function(id:Number){
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tv/${id}/similar`,
      options
    );
    return res.json()
  },
  getTVByGenres: async function (genre_id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/discover/tv?with_genres=${genre_id}`,
      options
    );
    return res.json();
  },
  getListTVGenres: async function () {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/genre/tv/list`,
      options
    );
    return res.json();
  },
};
