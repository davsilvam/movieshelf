export const GENRES_URL = `/genre/movie/list?api_key=${
  import.meta.env.VITE_API_KEY
}&language=pt-BR`

export const GENRE_MOVIES_URL = (id: string) =>
  `/discover/movie?api_key=${
    import.meta.env.VITE_API_KEY
  }&with_genres=${id}&language=pt-BR`

export const MOVIE_DETAILS_URL = (id: number) =>
  `/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`

export const MOVIE_REVIEWS_URL = (id: number) =>
  `/movie/${id}/reviews?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=pt_BR&page=1`

export const SEARCH_MOVIES_URL = (id: string | undefined) =>
  `/search/movie?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=pt-BR&query=${id}&page=1&include_adult=false`

export const POPULAR_MOVIES_URL = `/movie/popular?api_key=${
  import.meta.env.VITE_API_KEY
}&language=pt-BR`

export const TOP_RATED_MOVIES = `/movie/top_rated?api_key=${
  import.meta.env.VITE_API_KEY
}&language=pt-BR&page=1`
