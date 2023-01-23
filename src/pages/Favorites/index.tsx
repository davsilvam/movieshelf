import { FC, useState } from 'react'

// Components
import { MovieCard, Sidebar } from '../../components'

// Contexts
import { useFavorites } from '../../contexts/FavoritesContext'

// Icons
import { StarIcon } from '@heroicons/react/24/outline'

// Services
import { instance } from '../../services/apiConfig'

// Types
import { MovieType } from '../../@types/movies'

// Query
import { useQuery } from 'react-query'

export const Favorites: FC = () => {
  const { favorites } = useFavorites()
  const [favoritesList, setFavoritesList] = useState<MovieType[]>([])

  useQuery(['favorites', favorites], () => {
    const MOVIE_DETAILS_URL = (id: number) =>
      `/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`

    favorites.map(async favorite => {
      if (!favorite) return

      const { data }: { data: MovieType } = await instance.get(
        MOVIE_DETAILS_URL(favorite)
      )

      setFavoritesList(state => [...state, data])
    })
  })

  return (
    <div className="flex min-h-screen w-full bg-darkest text-lightest">
      <Sidebar />
      <div className="flex w-full flex-col lg:max-w-[84%]">
        <main className="flex w-full flex-col gap-6 px-8 py-10">
          <h2>Seus favoritos</h2>
          <section className="grid gap-x-6 max-lg:gap-y-4 md:grid-cols-3 lg:grid-cols-4">
            {favoritesList &&
              favoritesList.map(favorite => (
                <div
                  className="flex cursor-pointer flex-col gap-3 max-md:grid max-md:grid-cols-2"
                  key={favorite.id}
                >
                  <MovieCard movie={favorite}>
                    <div className="flex w-full flex-col gap-1 md:hidden">
                      <h3>{favorite.title}</h3>
                      <p className="flex items-center gap-1 font-semibold text-lightest">
                        {favorite.vote_average}{' '}
                        <StarIcon className="w-4 text-main" />
                      </p>
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
