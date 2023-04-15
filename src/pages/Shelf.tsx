import { FC } from 'react'

// components
import { ShelfMovieCard } from '../components'

// contexts
import { useShelf } from '../contexts/ShelfContext'

// hooks
import { useShelfMovies } from '../hooks'

// layout
import { PageLayout } from './'

export const Shelf: FC = () => {
  const { shelf } = useShelf()
  const { shelfList } = useShelfMovies()

  return (
    <PageLayout>
      <main className="flex w-full flex-col gap-6 px-8 py-10">
        <h1 className="text-2xl">Estante</h1>
        <section className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {shelfList &&
            shelfList.map(movie => (
              <ShelfMovieCard
                movie={movie}
                movieStatus="shelf"
                key={movie.id}
              />
            ))}
        </section>
      </main>
    </PageLayout>
  )
}
