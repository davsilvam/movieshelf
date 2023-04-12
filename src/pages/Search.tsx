import { FC } from 'react'

// components
import { Header, MovieCard } from '../components'

// layout
import { PageLayout } from './'

// hooks
import { useSearchMovies } from '../hooks'

// router
import { useParams } from 'react-router-dom'

export const Search: FC = () => {
  const { id } = useParams()
  const { data: movies } = useSearchMovies(id)

  return (
    <PageLayout>
      <Header />
      <main className="flex w-full flex-col px-8 py-4 pt-20">
        <section className="grid gap-6 max-lg:gap-y-4 md:grid-cols-3 lg:grid-cols-4">
          {movies?.map(movie => (
            <div
              className="group flex cursor-pointer flex-col gap-3"
              key={movie.id}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </section>
      </main>
    </PageLayout>
  )
}
