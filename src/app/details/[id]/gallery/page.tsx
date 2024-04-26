'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { httpClientFactory } from 'factories'
import { LoadMovieDetailsGateway, LoadMovieImagesGateway } from 'gateways'

import { useMovieDetails, useMovieImages } from 'hooks'

export default function MovieGallery() {
  const { id } = useParams() as { id: string }

  const loadMovieDetails = new LoadMovieDetailsGateway(httpClientFactory)
  const loadMovieImages = new LoadMovieImagesGateway(httpClientFactory)

  const { details } = useMovieDetails({
    loadMovieDetails,
    id,
  })

  const { images } = useMovieImages({
    loadMovieImages,
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
            <Image
              alt={`${details?.title} backdrop.`}
              src={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
              className="w-full rounded-lg"
              key={backdrop + 'w'}
              height={225}
              width={400}
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
            <Image
              alt={`${details?.title} poster.`}
              src={`https://image.tmdb.org/t/p/w342${poster.file_path}`}
              className="w-full rounded-lg"
              key={poster + 'w'}
              height={330}
              width={220}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
