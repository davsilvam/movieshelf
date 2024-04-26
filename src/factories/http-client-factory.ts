import { FetchHttpClientAdapter, HttpClient } from 'adapters'

export const httpClientFactory: HttpClient = new FetchHttpClientAdapter()
