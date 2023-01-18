import React, { useEffect, useState } from 'react'

// Components
import { Header, MovieCard, Sidebar } from '../../components'

// Router
import { useParams } from 'react-router-dom'

// Services
import { ApiException } from '../../services/apiException'
import { MoviesService } from '../../services/apiServices'

// Types
import { MovieType } from '../../@types/movies'

export const Search: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([])
  const { id } = useParams()

  useEffect(() => {
    if (!id) return

    MoviesService.searchMovies(id).then(response => {
      if (response instanceof ApiException) {
        return console.log(response.message)
      }

      setMovies(response.results)
    })
  }, [id])

  return (
    <div className="flex min-h-screen w-full bg-darkest text-lightest">
      <Sidebar />
      <div className="relative flex w-full flex-col lg:max-w-[84%]">
        <Header />
        <main className="flex w-full flex-col px-8 py-4 pt-20">
          <section className="grid gap-6 max-lg:gap-y-4 md:grid-cols-3 lg:grid-cols-4">
            {movies.map(movie => (
              <div
                className="group flex cursor-pointer flex-col gap-3"
                key={movie.id}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
