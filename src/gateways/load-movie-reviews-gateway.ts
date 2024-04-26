import { HttpClient } from 'adapters'

import { LoadMovieReviews } from 'hooks'

export class LoadMovieReviewsGateway implements LoadMovieReviews {
  constructor(private httpClient: HttpClient) {}

  async loadAll(id: string) {
    return this.httpClient.request({
      url: `movie/${id}/reviews`,
      method: 'get',
    })
  }
}
