'use client'

import { ReactNode, createContext } from 'react'

import { FetchHttpClientAdapter, HttpClient } from 'adapters'
import { MovieGateway, MovieGatewayHTTP } from 'gateways'

interface MovieContextProps {
  httpClient: HttpClient
  movieGateway: MovieGateway
}

export const MovieContext = createContext<MovieContextProps | null>(null)

interface MovieProviderProps {
  children: ReactNode
}

export function MovieProvider({ children }: MovieProviderProps) {
  const httpClient = new FetchHttpClientAdapter()
  const movieGateway = new MovieGatewayHTTP(httpClient)

  return (
    <MovieContext.Provider
      value={{
        httpClient,
        movieGateway,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}
