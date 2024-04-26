import { HttpClient } from 'adapters'

import { LoadDiscoverMovies } from 'hooks'

export class LoadDiscoverMoviesGateway implements LoadDiscoverMovies {
  constructor(private httpClient: HttpClient) {}

  async execute(query: string, page: number) {
    return this.httpClient.request({
      url: `discover/movie?language=pt-BR&${query}&page=${page}`,
      method: 'get',
    })
  }
}
