'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Fragment, ReactNode } from 'react'

import { ArrowLeft, ImageOff } from 'lucide-react'

import { Button, DetailsBanner } from 'components'

import { useMovie } from 'hooks'

export default function Layout({ children }: { children: ReactNode }) {
  const { id } = useParams()
  const { movie } = useMovie(id)
  const { back } = useRouter()

  const moviePoster = `https://image.tmdb.org/t/p/w342${movie?.poster_path}`
  const runtimeHours = movie && Math.floor(movie?.runtime / 60)
  const runtimeMinutes = movie && movie?.runtime % 60

  return (
    <div className="relative z-0 min-h-screen bg-woodsmoke px-10 pb-10">
      {movie && (
        <Fragment>
          <Button className="absolute top-10" onClick={back}>
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>

          <DetailsBanner movie={movie} />

          <div className="flex w-full justify-between pt-[450px]">
            <div className="flex items-start gap-10">
              {movie?.poster_path ? (
                <Image
                  alt={`${movie.title} poster.`}
                  src={moviePoster}
                  className="rounded-2xl"
                  width={200}
                  height={300}
                />
              ) : (
                <div className="flex h-[300px] w-[200px] items-center justify-center rounded-2xl bg-oslo text-woodsmoke">
                  <ImageOff className="h-8 w-8" />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  {movie.genres.map((genre) => (
                    <Fragment key={genre.id}>
                      {movie.genres.indexOf(genre) > 0 && (
                        <div className="h-4 w-[1px] bg-oslo" />
                      )}

                      <p className="font-alt uppercase text-white">
                        {genre.name}
                      </p>
                    </Fragment>
                  ))}
                </div>

                <h1 className="font-alt text-5xl uppercase text-white">
                  {movie.title}
                </h1>

                <q className="font-medium italic text-oslo">
                  {movie.tagline || 'Esse filme não possui slogan.'}
                </q>

                <div className="flex items-center gap-4 pt-2 font-alt text-white">
                  {movie.release_date && (
                    <Fragment>
                      <p>{movie.release_date.slice(0, -6)}</p>
                      <div className="h-4 w-[1px] bg-oslo" />
                    </Fragment>
                  )}
                  <p>{`${runtimeHours}h ${runtimeMinutes}m`}</p>
                </div>

                <h2 className="pt-4 font-alt text-xl text-white">Sinopse</h2>
                <p className="max-w-[900px] text-sm leading-relaxed text-oslo">
                  {movie.overview || 'Esse filme não possui sinopse.'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-right font-alt text-white">
                <p className="text-lg">
                  <span className="text-4xl text-pizazz">
                    {movie.vote_average.toFixed(1)}{' '}
                  </span>
                  / 10
                </p>
                <p className="text-sm">Avaliação</p>
              </div>

              <div className="text-right font-alt text-white">
                <p className="text-lg">
                  <span className="text-4xl">
                    {String(movie.vote_count).length > 3
                      ? movie.vote_count.toLocaleString().slice(0, -4)
                      : movie.vote_count.toLocaleString()}
                  </span>
                  {String(movie.vote_count).length > 3
                    ? movie.vote_count.toLocaleString().slice(-4)
                    : ''}
                </p>

                <p className="text-sm">Avaliações</p>
              </div>
            </div>
          </div>

          {children}
        </Fragment>
      )}
    </div>
  )
}
