'use client'

import { Header } from 'components'
import { BannerCard } from 'components/Banner/BannerCard'
import { BannerSkeleton } from 'components/Banner/BannerSkeleton'
import { MovieCard } from 'components/Movie/MovieCard'
import { MovieContainerSkeleton } from 'components/Movie/MovieContainerSkeleton'
import { useMovies } from 'hooks/useMovies'
import Link from 'next/link'
import { Fragment } from 'react'

export default function Popular() {
  const {
    popularMovies: { data: popularMovies, isLoading },
  } = useMovies()

  return (
    <main>
      <Header />

      {isLoading ? (
        <BannerSkeleton />
      ) : (
        popularMovies && (
          <div className="h-[80vh] max-w-full">
            <BannerCard movie={popularMovies[0]} />
          </div>
        )
      )}

      <section className="flex flex-col gap-8 px-10 py-16">
        {isLoading ? (
          <MovieContainerSkeleton />
        ) : (
          <Fragment>
            <h1 className="font-alt text-3xl uppercase text-white">
              Populares
            </h1>

            <div className="grid grid-cols-5 gap-12">
              {popularMovies?.map((movie) => (
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
