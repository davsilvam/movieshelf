'use client'

import Link from 'next/link'
import { Fragment } from 'react'

import {
  BannerCard,
  BannerSkeleton,
  MovieCard,
  MovieContainerSkeleton,
} from 'components'

import { useMovies } from 'hooks'

export default function Hottest() {
  const {
    nowPlayingMovies: { data: nowPlayingMovies, isLoading },
  } = useMovies()

  return (
    <main>
      {isLoading ? (
        <BannerSkeleton />
      ) : (
        nowPlayingMovies && (
          <div className="h-[80vh] max-w-full">
            <BannerCard movie={nowPlayingMovies[0]} />
          </div>
        )
      )}

      <section className="flex flex-col gap-8 px-10 py-16">
        {isLoading ? (
          <MovieContainerSkeleton />
        ) : (
          <Fragment>
            <h1 className="font-alt text-5xl uppercase text-white">
              Novidades
            </h1>

            <div className="grid grid-cols-5 gap-12">
              {nowPlayingMovies?.map((movie) => (
                <Link href={`/movie/${movie.id}`} key={movie.id}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
          </Fragment>
        )}
      </section>
    </main>
  )
}
