import { HttpClient } from 'adapters'

import { LoadSearchedMovies } from 'hooks'

export class LoadSearchedMoviesGateway implements LoadSearchedMovies {
  constructor(private httpClient: HttpClient) {}

  async execute(title: string, page: number) {
    return this.httpClient.request({
      url: `search/movie?query=${title}&language=pt-BR&page=${page}`,
      method: 'get',
    })
  }
}
