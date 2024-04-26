/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpRequest = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  body?: any
  headers?: any
}

export enum HttpStatusCodes {
  ok = 200,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<R> = {
  statusCode: HttpStatusCodes
  body?: R
}

export interface HttpClient<R = any> {
  request: (request: HttpRequest) => Promise<HttpResponse<R>>
}
