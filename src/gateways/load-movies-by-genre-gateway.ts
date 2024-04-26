import { HttpClient } from 'adapters'

import { LoadMoviesByGenre } from 'hooks'

export class LoadMoviesByGenreGateway implements LoadMoviesByGenre {
  constructor(private httpClient: HttpClient) {}

  async execute(genreId: number) {
    return this.httpClient.request({
      url: `discover/movie?language=pt-BR&sort_by=popularity.desc&with_genres=${genreId}`,
      method: 'get',
    })
  }
}
