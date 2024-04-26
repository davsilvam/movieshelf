'use client'

import { FetchHttpClientAdapter, HttpClient } from 'infra/adapters'
import { ArrowUpRight } from 'lucide-react'

import {
  BannerSlider,
  Header,
  LinkButton,
  MenuBar,
  MovieCatalog,
} from 'components'

import { Movie } from 'types'

function loadHottestMovies(
  httpClient: HttpClient<{
    results: Movie[]
  }>,
) {
  async function loadAll() {
    return httpClient.request({
      url: '/movie/now_playing?language=pt-BR',
      method: 'get',
    })
  }

  return { loadAll }
}

function loadMoviesByGenre(
  httpClient: HttpClient<{
    results: Movie[]
  }>,
) {
  async function loadAll(genreId: number) {
    return httpClient.request({
      url: `discover/movie?language=pt-BR&sort_by=popularity.desc&with_genres=${genreId}`,
      method: 'get',
    })
  }

  return { loadAll }
}

export default function Home() {
  return (
    <main className="bg-woodsmoke">
      <Header />
      <BannerSlider
        loadHottestMovies={loadHottestMovies(new FetchHttpClientAdapter())}
      />
      <MovieCatalog
        loadHottestMovies={loadHottestMovies(new FetchHttpClientAdapter())}
        loadMoviesByGenre={loadMoviesByGenre(new FetchHttpClientAdapter())}
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
