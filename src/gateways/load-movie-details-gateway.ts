import { HttpClient } from 'adapters'

import { LoadMovieDetails } from 'hooks'

export class LoadMovieDetailsGateway implements LoadMovieDetails {
  constructor(private httpClient: HttpClient) {}

  async load(id: string) {
    return this.httpClient.request({
      url: `movie/${id}?language=pt-BR`,
      method: 'get',
    })
  }
}
