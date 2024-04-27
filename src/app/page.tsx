'use client'

import Link from 'next/link'

import { httpClientFactory } from 'factories'
import {
  LoadMoviesByGenreGateway,
  LoadNowPlayingMoviesGateway,
  LoadPopularMoviesGateway,
  LoadTopRatedMoviesGateway,
} from 'gateways'
import { ArrowUpRight } from 'lucide-react'

import { BannerSlider, Button, Header, MenuBar, MovieCatalog } from 'components'
import { Carousel } from 'components/banner/carousel'

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

      {/* <Carousel /> */}

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

        <Button asChild size={'lg'} className="z-10 w-fit">
          <Link href="/discover">
            Descubra outros títulos
            <ArrowUpRight className="w-5" />
          </Link>
        </Button>
      </div>

      <MenuBar />
    </main>
  )
}
