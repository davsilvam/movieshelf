import { FC, useState } from 'react'

// Components
import { MovieCard, Sidebar } from '../components/exports'

// Contexts
import { useShelf } from '../contexts/ShelfContext'

// Icons
import { HeartIcon } from '@heroicons/react/20/solid'

// Services
import { instance } from '../services/apiConfig'

// Types
import { MovieType } from '../@types/tmdb'

// Query
import { useQuery } from 'react-query'

export const Favorites: FC = () => {
  const { favorites } = useShelf()
  const [favoritesList, setFavoritesList] = useState<MovieType[]>([])

  useQuery(['favorites', favorites], () => {
    const MOVIE_DETAILS_URL = (id: number) =>
      `/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`

    favorites.map(async favorite => {
      if (!favorite) return

      const { data }: { data: MovieType } = await instance.get(
        MOVIE_DETAILS_URL(favorite.id)
      )

      setFavoritesList(state => [...state, data])
    })
  })

  return (
    <div className="flex min-h-screen w-full bg-secondary-900 text-secondary-50">
      <Sidebar />
      <div className="flex w-full flex-col lg:max-w-[84%]">
        <main className="flex w-full flex-col gap-6 px-8 py-10">
          <h1>Favoritos</h1>
          <section className="flex flex-col items-center gap-x-6 gap-y-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {favoritesList &&
              favoritesList.map(favorite => (
                <div
                  className="flex w-[80%] cursor-pointer flex-col gap-3"
                  key={favorite.id}
                >
                  <MovieCard movie={favorite}>
                    <div className="mt-1 flex w-full flex-col items-start justify-start gap-[2px] max-md:col-span-1">
                      <h3 className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-start text-sm">
                        {favorite.title}
                      </h3>
                      <div className="flex w-full items-center justify-between">
                        <span className="flex items-center gap-1 text-carnation">
                          <HeartIcon className="w-4" />
                        </span>
                        <span className="flex items-center gap-1 text-cadet">
                          <h4 className="text-xs">
                            {favorite.release_date.slice(0, 4)}
                          </h4>
                        </span>
                      </div>
                    </div>
                  </MovieCard>
                </div>
              ))}
          </section>
        </main>
      </div>
    </div>
  )
}
