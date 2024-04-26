import { HttpClient } from 'adapters'

import { LoadMovieCredits } from 'hooks'

export class LoadMovieCreditsGateway implements LoadMovieCredits {
  constructor(private httpClient: HttpClient) {}

  async loadAll(id: string) {
    return this.httpClient.request({
      url: `movie/${id}/credits?language=pt-BR`,
      method: 'get',
    })
  }
}
