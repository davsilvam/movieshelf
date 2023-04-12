import { FC, useState } from 'react'

// Components
import { MovieCard } from '../components'

// Contexts
import { useShelf } from '../contexts/ShelfContext'

// Icons
import { HeartIcon, StarIcon } from '@heroicons/react/20/solid'

// Layout
import { PageLayout } from './PageLayout'

// Services
import { api } from '../services/api'

// Types
import { Movie } from '../@types/tmdb'

// Query
import { useQuery } from '@tanstack/react-query'

export const Shelf: FC = () => {
  const { favorites, shelf } = useShelf()
  const [shelfList, setShelfList] = useState<Movie[]>([])

  useQuery(['shelf', shelf], () => {
    const MOVIE_DETAILS_URL = (id: number) =>
      `/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`

    shelf.map(async movie => {
      if (!movie) return

      const { data }: { data: Movie } = await api.get(
        MOVIE_DETAILS_URL(movie.id)
      )

      setShelfList(state => [...state, data])
    })
  })

  return (
    <PageLayout>
      <main className="flex w-full flex-col gap-6 px-8 py-10">
        <h1>Estante</h1>
        <section className="flex flex-col items-center  gap-x-6 gap-y-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {shelfList &&
            shelfList.map(movie => (
              <div
                className="flex w-[80%] cursor-pointer flex-col gap-3"
                key={movie.id}
              >
                <MovieCard movie={movie}>
                  <div className="mt-1 flex w-full flex-col items-start justify-start gap-[2px] max-md:col-span-1">
                    <h3 className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-start text-sm">
                      {movie.title}
                    </h3>
                    <div className="flex w-full items-center justify-between">
                      <span className="flex items-center gap-1 text-pizazz">
                        <StarIcon className="w-3" />
                        <h4 className="pt-[1.75px] text-xs">
                          {
                            shelf.find(shelfMovie => shelfMovie.id === movie.id)
                              ?.rate
                          }
                        </h4>
                      </span>
                      <div className="flex gap-1">
                        {favorites.some(
                          favorite => favorite.id === movie.id
                        ) && <HeartIcon className="w-4 text-carnation" />}
                      </div>
                    </div>
                  </div>
                </MovieCard>
              </div>
            ))}
        </section>
      </main>
    </PageLayout>
  )
}
