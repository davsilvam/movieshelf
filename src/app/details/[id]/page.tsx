'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useMoviesDependencies } from 'contexts'
import { ArrowRight } from 'lucide-react'
import { z } from 'zod'

import {
  MovieCard,
  MovieDetailsImageCard,
  MovieDetailsMemberCard,
} from 'components'
import { ReviewCard } from 'components/movie/details/review-card'

import { useMovie } from 'hooks'

const paramsSchema = z.object({
  id: z.string(),
})

export type Params = z.infer<typeof paramsSchema>

export default function MovieDetails() {
  const { id } = useParams<Params>()

  const { movieGateway } = useMoviesDependencies()

  const { details, mainBackdrops, mainCast, reviews, topRecommendations } =
    useMovie({
      movieGateway,
      id,
    })

  return (
    <main className="flex flex-col items-start gap-6 pt-6">
      {mainCast && mainCast?.length > 0 && (
        <section className="flex w-full flex-col gap-5">
          <h2 className="pt-4 font-alt text-xl text-white">Elenco</h2>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
            {mainCast?.map(actor => (
              <MovieDetailsMemberCard
                name={actor.name}
                profilePath={actor.profile_path}
                character={actor.character}
                key={actor.id}
              />
            ))}
          </div>

          <Link
            className="flex items-center gap-3 self-end p-2 font-medium text-white"
            href={`/details/${id}/credits`}
          >
            Ver elenco completo <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}

      {mainBackdrops && mainBackdrops?.length > 0 && (
        <section className="flex w-full flex-col gap-5">
          <h2 className="pt-4 font-alt text-xl text-white">Galeria</h2>

          <div className="flex w-full items-center justify-between gap-4 max-md:flex-col md:gap-10">
            {mainBackdrops?.map(backdrop => (
              <MovieDetailsImageCard
                movieTitle={details?.title || ''}
                filePath={backdrop.file_path}
                type="backdrop"
                key={backdrop.file_path}
              />
            ))}
          </div>

          <Link
            className="flex items-center gap-3 self-end p-2 font-medium text-white"
            href={`/details/${id}/gallery`}
          >
            Ver galeria completo <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}

      {reviews && reviews?.length > 0 && (
        <section className="flex w-full flex-col gap-5">
          <h2 className="pt-4 font-alt text-xl text-white">Resenhas</h2>

          <div className="flex w-full flex-col items-center gap-5">
            {reviews?.map(review => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>
        </section>
      )}

      {topRecommendations && topRecommendations?.length > 0 && (
        <section className="flex w-full flex-col gap-5">
          <h2 className="pt-4 font-alt text-xl text-white">Recomendações</h2>

          <div className="grid w-full grid-cols-3 gap-4 lg:grid-cols-4 lg:gap-10 xl:grid-cols-5">
            {topRecommendations?.map(movie => (
              <Link href={`/details/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} key={movie.id} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
