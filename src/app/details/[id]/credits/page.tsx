'use client'

import { useParams } from 'next/navigation'

import { MovieDetailsMemberCard } from 'components'

import { useMoviesDependencies } from 'contexts/hooks/use-movies-dependencies'
import { useMovieCredits } from 'hooks'

import { Params } from '../page'

export default function MovieCredits() {
  const { id } = useParams<Params>()

  const { movieGateway } = useMoviesDependencies()

  const { credits } = useMovieCredits({
    movieGateway,
    id,
  })

  return (
    <main className="flex flex-col items-start gap-6 pt-6">
      <section className="flex w-full flex-col gap-5">
        <h2 className="pt-4 font-alt text-xl text-white">Elenco</h2>

        <div className="grid grid-cols-2 gap-2 gap-y-5 md:grid-cols-4 xl:grid-cols-5">
          {credits?.cast.map(actor => (
            <MovieDetailsMemberCard
              name={actor.name}
              profilePath={actor.profile_path}
              character={actor.character}
              key={actor.id}
            />
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col gap-5">
        <h2 className="pt-4 font-alt text-xl text-white">Equipe</h2>

        <div className="grid grid-cols-2 gap-2 gap-y-5 md:grid-cols-4 xl:grid-cols-5">
          {credits?.crew.map(employee => (
            <MovieDetailsMemberCard
              name={employee.name}
              profilePath={employee.profile_path}
              job={employee.job}
              key={employee.id}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
