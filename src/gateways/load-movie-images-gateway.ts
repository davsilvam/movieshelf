import { HttpClient } from 'adapters'

import { LoadMovieImages } from 'hooks'

export class LoadMovieImagesGateway implements LoadMovieImages {
  constructor(private httpClient: HttpClient) {}

  async loadAll(id: string) {
    return this.httpClient.request({
      url: `movie/${id}/images`,
      method: 'get',
    })
  }
}
