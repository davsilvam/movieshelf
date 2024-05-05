'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Fragment, ReactNode } from 'react'

import { ArrowLeft, ImageOff } from 'lucide-react'

import { Button, DetailsBanner } from 'components'

import { useMoviesDependencies } from 'contexts/hooks/use-movies-dependencies'
import { useMovieDetails } from 'hooks'

export default function Layout({ children }: { children: ReactNode }) {
  const { id } = useParams() as { id: string }
  const { back } = useRouter()

  const { movieGateway } = useMoviesDependencies()

  const { details, moviePoster, runtimeHours, runtimeMinutes } =
    useMovieDetails({
      movieGateway,
      id,
    })

  return (
    <div className="relative z-0 min-h-screen bg-woodsmoke px-6 pb-10 md:px-10">
      {details && (
        <Fragment>
          <Button onClick={back} className="absolute top-10">
            <ArrowLeft className="w-4" />
            Voltar
          </Button>

          <DetailsBanner movie={details} />

          <div className="flex w-full justify-between pt-[450px] max-md:flex-col max-md:gap-5">
            <div className="flex items-start gap-10 max-md:flex-col">
              {details?.poster_path ? (
                <Image
                  alt={`${details.title} poster.`}
                  src={moviePoster}
                  className="m-auto aspect-[2/3] w-full max-w-[300px] rounded-2xl md:w-[200px]"
                  width={300}
                  height={450}
                />
              ) : (
                <div className="flex h-[300px] w-[200px] items-center justify-center rounded-2xl bg-oslo text-woodsmoke">
                  <ImageOff className="h-8 w-8" />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  {details.genres.map(genre => (
                    <Fragment key={genre.id}>
                      {details.genres.indexOf(genre) > 0 && (
                        <div className="h-4 w-[1px] bg-oslo" />
                      )}

                      <p className="font-alt uppercase text-white">
                        {genre.name}
                      </p>
                    </Fragment>
                  ))}
                </div>

                <h1 className="font-alt text-5xl uppercase text-white">
                  {details.title}
                </h1>

                <q className="font-medium italic text-oslo">
                  {details.tagline || 'Esse filme não possui slogan.'}
                </q>

                <div className="flex items-center gap-4 pt-2 font-alt text-white">
                  {details.release_date && (
                    <Fragment>
                      <p>{details.release_date.slice(0, -6)}</p>
                      <div className="h-4 w-[1px] bg-oslo" />
                    </Fragment>
                  )}
                  <p>{`${runtimeHours}h ${runtimeMinutes}m`}</p>
                </div>

                <h2 className="pt-4 font-alt text-xl text-white">Sinopse</h2>
                <p className="max-w-[900px] text-sm leading-relaxed text-oslo">
                  {details.overview || 'Esse filme não possui sinopse.'}
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-end gap-4 max-md:justify-end md:flex-col">
              <div className="whitespace-nowrap text-right font-alt text-white">
                <p className="text-lg">
                  <span className="text-3xl text-pizazz md:text-4xl">
                    {details.vote_average.toFixed(1)}{' '}
                  </span>
                  / 10
                </p>
                <p className="text-sm">Avaliação</p>
              </div>

              <div className="text-right font-alt text-white">
                <p className="text-lg">
                  <span className="text-3xl md:text-4xl">
                    {String(details.vote_count).length > 3
                      ? details.vote_count.toLocaleString().slice(0, -4)
                      : details.vote_count.toLocaleString()}
                  </span>
                  {String(details.vote_count).length > 3
                    ? details.vote_count.toLocaleString().slice(-4)
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
