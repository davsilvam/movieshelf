'use client'

import { useParams } from 'next/navigation'

import { MovieDetailsImageCard } from 'components'

import { useMoviesDependencies } from 'contexts/hooks/use-movies-dependencies'
import { useMovieDetails, useMovieImages } from 'hooks'

import { Params } from '../page'

export default function MovieGallery() {
  const { id } = useParams<Params>()

  const { movieGateway } = useMoviesDependencies()

  const { details } = useMovieDetails({
    movieGateway,
    id,
  })

  const { images } = useMovieImages({
    movieGateway,
    id,
  })

  return (
    <main className="flex flex-col items-start gap-6 pt-6">
      <section className="flex w-full flex-col gap-5">
        <h2 className="pt-4 font-alt text-xl text-white">
          Planos de fundo ({images?.backdrops.length})
        </h2>

        <div className="grid grid-cols-2 justify-between gap-5 md:grid-cols-3">
          {images?.backdrops.map(backdrop => (
            <MovieDetailsImageCard
              movieTitle={details?.title || ''}
              filePath={backdrop.file_path}
              type="backdrop"
              key={backdrop + 'w'}
            />
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col gap-5">
        <h2 className="pt-4 font-alt text-xl text-white">
          Cartazes ({images?.posters.length})
        </h2>

        <div className="grid grid-cols-3 gap-5 md:grid-cols-5">
          {images?.posters.map(poster => (
            <MovieDetailsImageCard
              movieTitle={details?.title || ''}
              filePath={poster.file_path}
              type="poster"
              key={poster + 'w'}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
