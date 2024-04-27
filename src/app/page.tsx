'use client'

import { httpClientFactory } from 'factories'
import {
  LoadMoviesByGenreGateway,
  LoadNowPlayingMoviesGateway,
  LoadPopularMoviesGateway,
  LoadTopRatedMoviesGateway,
} from 'gateways'
import { ArrowUpRight } from 'lucide-react'

import {
  BannerSlider,
  Header,
  LinkButton,
  MenuBar,
  MovieCatalog,
} from 'components'

export default function Home() {
  const loadNowPlayingMovies = new LoadNowPlayingMoviesGateway(
    httpClientFactory,
  )
  const loadPopularMovies = new LoadPopularMoviesGateway(httpClientFactory)
  const loadTopRatedMovies = new LoadTopRatedMoviesGateway(httpClientFactory)
  const loadMoviesByGenre = new LoadMoviesByGenreGateway(httpClientFactory)

  return (
    <main className="bg-woodsmoke">
      <Header />
      <BannerSlider loadNowPlayingMovies={loadNowPlayingMovies} />

      <MovieCatalog
        loadNowPlayingMovies={loadNowPlayingMovies}
        loadPopularMovies={loadPopularMovies}
        loadTopRatedMovies={loadTopRatedMovies}
        loadMoviesByGenre={loadMoviesByGenre}
      />

      <div className="flex h-screen w-full flex-col items-center justify-center gap-5 md:gap-10">
        <p className="font-alt text-3xl font-semibold text-white md:text-5xl">
          Não achou o que queria?
        </p>

        <LinkButton href="/discover" icon={ArrowUpRight}>
          Descubra outros títulos
        </LinkButton>
      </div>

      <MenuBar />
    </main>
  )
}
