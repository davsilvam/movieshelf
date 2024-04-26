import { HttpClient } from 'adapters'

import { LoadMovies } from 'hooks'

export class LoadTopRatedMoviesGateway implements LoadMovies {
  constructor(private httpClient: HttpClient) {}

  async loadAll() {
    return this.httpClient.request({
      url: '/movie/top_rated?language=pt-BR',
      method: 'get',
    })
  }
}
