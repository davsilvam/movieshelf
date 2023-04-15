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
      <main className="mt-4 flex w-full flex-col px-8 py-4 pt-20">
        <h1 className="mb-5 text-lg font-medium text-secondary-200">
          Resultados para{' '}
          <em className="font-semibold text-secondary-50">{id}</em>
        </h1>
        <section className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
