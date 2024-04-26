'use client'

import { Fragment } from 'react'

import { httpClientFactory } from 'factories'
import { LoadNowPlayingMoviesGateway } from 'gateways'

import {
  BannerCard,
  BannerSkeleton,
  MovieContainer,
  PageTitle,
} from 'components'

import { useNowPlayingMovies } from 'hooks'

export default function NowPlaying() {
  const loadNowPlayingMovies = new LoadNowPlayingMoviesGateway(
    httpClientFactory,
  )

  const { nowPlayingMovies, isLoading } = useNowPlayingMovies({
    loadNowPlayingMovies,
  })

  return (
    <main>
      {isLoading ? (
        <BannerSkeleton />
      ) : (
        nowPlayingMovies && (
          <div className="h-[70vh] max-w-full md:h-[80vh] lg:h-[90vh]">
            <BannerCard movie={nowPlayingMovies[0]} />
          </div>
        )
      )}

      <section className="flex flex-col gap-8 px-6 py-8 md:px-10 md:py-16">
        <PageTitle>Novidades</PageTitle>

        {isLoading ? (
          <MovieContainer.Skeleton />
        ) : (
          <Fragment>
            {nowPlayingMovies && (
              <MovieContainer.Root movies={nowPlayingMovies} range={[0, 21]} />
            )}
          </Fragment>
        )}
      </section>
    </main>
  )
}
