'use client'

import { useMovies } from 'hooks/useMovies'
import { Flame, Heart, HeartCrack, Orbit, Sparkle } from 'lucide-react'
import { MovieContainer } from './MovieContainer'
import { useMovieCatalog } from './hooks/useMovieCatalog'

export function MovieCatalog() {
  const { nowPlayingMovies } = useMovies()
  const { movieQueries } = useMovieCatalog([16, 28, 18, 10749, 878])

  return (
    <main className="flex flex-col items-center gap-16 px-10 pb-40">
      {nowPlayingMovies && (
        <MovieContainer
          icon={Flame}
          title="Novidades"
          movies={nowPlayingMovies}
        />
      )}

      {movieQueries[0] && (
        <MovieContainer
          icon={Sparkle}
          title="Animação"
          movies={movieQueries[0]}
          hasBanner
        />
      )}

      {movieQueries[1] && (
        <MovieContainer icon={Flame} title="Ação" movies={movieQueries[1]} />
      )}

      {movieQueries[2] && (
        <MovieContainer
          icon={HeartCrack}
          title="Drama"
          movies={movieQueries[2]}
          hasBanner
        />
      )}

      {movieQueries[3] && (
        <MovieContainer icon={Heart} title="Romance" movies={movieQueries[3]} />
      )}

      {movieQueries[4] && (
        <MovieContainer
          icon={Orbit}
          title="Ficção Científica"
          movies={movieQueries[4]}
          hasBanner
        />
      )}
    </main>
  )
}
