import { HttpClient } from 'adapters'

import { LoadMovieSimilar } from 'hooks'

export class LoadMovieSimilarGateway implements LoadMovieSimilar {
  constructor(private httpClient: HttpClient) {}

  async execute(id: string) {
    return this.httpClient.request({
      url: `movie/${id}/similar`,
      method: 'get',
    })
  }
}
