'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { ImageOff } from 'lucide-react'

import { useMovie } from 'hooks'

export default function MovieCredits() {
  const { id } = useParams()
  const { credits } = useMovie(id)

  return (
    <main className="flex flex-col items-start gap-6 pt-6">
      <section className="flex w-full flex-col gap-5">
        <h2 className="pt-4 font-alt text-xl text-white">Elenco</h2>

        <div className="grid grid-cols-2 gap-2 gap-y-5 md:grid-cols-4 xl:grid-cols-5">
          {credits?.cast.map(actor => (
            <div className="flex items-center gap-4" key={actor.id}>
              {actor.profile_path ? (
                <Image
                  alt={`${actor.name} profile picture.`}
                  src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                  className="w-16 rounded-lg"
                  height={96}
                  width={64}
                />
              ) : (
                <div className="flex h-24 min-w-[64px] items-center justify-center rounded-lg bg-oslo">
                  <ImageOff className="h-5 w-5 text-woodsmoke" />
                </div>
              )}

              <div className="flex flex-col items-start gap-0.5">
                <p className="font-medium text-white">{actor.name}</p>
                <p className="text-sm text-oslo">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col gap-5">
        <h2 className="pt-4 font-alt text-xl text-white">Equipe</h2>

        <div className="grid grid-cols-2 gap-2 gap-y-5 md:grid-cols-4 xl:grid-cols-5">
          {credits?.crew.map(employee => (
            <div className="flex items-center gap-4" key={employee.id}>
              {employee.profile_path ? (
                <Image
                  alt={`${employee.name} profile picture.`}
                  src={`https://image.tmdb.org/t/p/w185${employee.profile_path}`}
                  className="w-16 rounded-lg"
                  height={96}
                  width={64}
                />
              ) : (
                <div className="flex h-24 min-w-[64px] items-center justify-center rounded-lg bg-oslo">
                  <ImageOff className="h-5 w-5 text-woodsmoke" />
                </div>
              )}

              <div className="flex flex-col items-start gap-0.5">
                <p className="font-medium text-white">{employee.name}</p>
                <p className="text-sm text-oslo">{employee.job}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
