'use client'

import { ReviewCard } from 'components'
import { MovieCard } from 'components/Movie/MovieCard'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMovie } from './hooks/useMovie'

export default function Movie() {
  const { id } = useParams()
  const { movie, mainCast, mainBackdrops, reviews, mainSimilar } = useMovie(id)

  return (
    <main className="flex flex-col items-start gap-6 pt-6">
      <section className="flex w-full flex-col gap-5">
        <h2 className="pt-4 font-alt text-xl text-white">Elenco</h2>

        <div className="grid grid-cols-5 gap-5">
          {mainCast?.map((actor) => (
            <div className="flex items-center gap-4" key={actor.id}>
              <Image
                alt={`${actor.name} profile picture.`}
                src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                className="rounded-lg"
                height={96}
                width={64}
              />

              <div className="flex flex-col items-start gap-0.5">
                <p className="font-medium text-white">{actor.name}</p>
                <p className="text-sm text-oslo">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          className="flex items-center gap-3 self-end p-2 font-medium text-white"
          href={`/movie/${id}/credits`}
        >
          Ver elenco completo <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="flex w-full flex-col gap-5">
        <h2 className="pt-4 font-alt text-xl text-white">Galeria</h2>

        <div className="flex w-full items-center justify-between">
          {mainBackdrops?.map((backdrop) => (
            <div className="flex items-center gap-4" key={backdrop + 'w'}>
              <Image
                alt={`${movie?.title} backdrop.`}
                src={`https://image.tmdb.org/t/p/w780${backdrop.file_path}`}
                className="rounded-lg"
                height={225}
                width={400}
              />
            </div>
          ))}
        </div>

        <Link
          className="flex items-center gap-3 self-end p-2 font-medium text-white"
          href={`/movie/${id}/gallery`}
        >
          Ver galeria completo <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="flex w-full flex-col gap-5">
        <h2 className="pt-4 font-alt text-xl text-white">Resenhas</h2>

        <div className="flex w-full flex-col items-center gap-5">
          {reviews?.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col gap-5">
        <h2 className="pt-4 font-alt text-xl text-white">Similar</h2>

        <div className="grid w-full grid-cols-5 gap-12">
          {mainSimilar?.map((movie) => (
            <Link href={`movie/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} key={movie.id} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
