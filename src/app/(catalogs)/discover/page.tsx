'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { queryClient } from 'services'

import {
  FiltersBar,
  MovieCard,
  MovieContainerSkeleton,
  PageTitle,
} from 'components'

import { useDiscoverMovies } from './hooks/useDiscoverMovies'

export default function Discover() {
  const searchParams = useSearchParams().toString()

  const {
    discoverMovies: { data: discoverMovies, isLoading },
  } = useDiscoverMovies(searchParams)

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['discover'],
    })
  }, [searchParams])

  return (
    <div className="flex items-center">
      <section className="relative flex w-full flex-col gap-8 px-10">
        <header className="flex flex-col gap-5">
          <PageTitle>Descubra</PageTitle>

          <FiltersBar />
        </header>

        {isLoading ? (
          <MovieContainerSkeleton />
        ) : (
          <div className="grid grid-cols-5 gap-12">
            {discoverMovies?.map((movie) => (
              <Link href={`/details/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
