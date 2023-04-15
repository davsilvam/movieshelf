import { FC } from 'react'

// components
import { ShelfMovieCard } from '../components'

// layout
import { PageLayout } from './'

// hooks
import { useFavoriteMovies } from '../hooks'

export const Favorites: FC = () => {
  const { favoritesList } = useFavoriteMovies()

  return (
    <PageLayout>
      <main className="flex w-full flex-col gap-6 px-8 py-10">
        <h1 className="text-2xl">Favoritos</h1>
        <section className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {favoritesList &&
            favoritesList.map(favorite => (
              <ShelfMovieCard
                movie={favorite}
                movieStatus="favorite"
                key={favorite.id}
              />
            ))}
        </section>
      </main>
    </PageLayout>
  )
}
