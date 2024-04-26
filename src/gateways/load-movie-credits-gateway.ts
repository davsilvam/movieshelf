import { HttpClient } from 'adapters'

import { LoadMovieCredits } from 'hooks'

export class LoadMovieCreditsGateway implements LoadMovieCredits {
  constructor(private httpClient: HttpClient) {}

  async execute(id: string) {
    return this.httpClient.request({
      url: `movie/${id}/credits?language=pt-BR`,
      method: 'get',
    })
  }
}
