import { HttpClient } from 'adapters'

import { LoadMovies } from 'hooks'

export class LoadPopularMoviesGateway implements LoadMovies {
  constructor(private httpClient: HttpClient) {}

  async loadAll() {
    return this.httpClient.request({
      url: '/movie/popular?language=pt-BR',
      method: 'get',
    })
  }
}
