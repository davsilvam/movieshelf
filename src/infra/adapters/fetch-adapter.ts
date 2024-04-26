import { fetchWrapper, FetchResponse } from 'functions'

import { HttpClient, HttpRequest, HttpResponse } from './http-client'

export class FetchHttpClientAdapter<R> implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    let response: FetchResponse

    try {
      response = await fetchWrapper<R>(data.url, {
        method: data.method,
        body: data.body,
      })
    } catch (error) {
      const _error = error as Error
      throw new Error(_error.message)
    }

    return {
      statusCode: response.statusCode,
      body: response.body as R,
    }
  }
}
