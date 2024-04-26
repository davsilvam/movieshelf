import { HttpClient } from 'adapters'

import { LoadMovies } from 'hooks'

export class LoadPopularMoviesGateway implements LoadMovies {
  constructor(private httpClient: HttpClient) {}

  async execute() {
    return this.httpClient.request({
      url: '/movie/popular?language=pt-BR',
      method: 'get',
    })
  }
}
