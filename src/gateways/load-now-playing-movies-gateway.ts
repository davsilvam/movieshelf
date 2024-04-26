import { HttpClient } from 'adapters'

import { LoadMovies } from 'hooks'

export class LoadNowPlayingMoviesGateway implements LoadMovies {
  constructor(private httpClient: HttpClient) {}

  async execute() {
    return this.httpClient.request({
      url: '/movie/now_playing?language=pt-BR',
      method: 'get',
    })
  }
}
