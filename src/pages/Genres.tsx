import { FC, useState } from 'react'

// components
import { Header, MovieCard } from '../components'

// hooks
import { useMovies, useGenres } from '../hooks'

// layout
import { PageLayout } from './'

// primitives
import { GenreSelect } from '../primitives'

// utils
import { GENRE_MOVIES_URL } from '../utils'

export const Genres: FC = () => {
  const [genreId, setGenreId] = useState<string>('')
  const { data: genres } = useGenres()
  const { data: genreMovies } = useMovies(GENRE_MOVIES_URL(genreId))

  const genreTitle = genreId
    ? genres?.find(genre => genre.id === Number(genreId))?.name
    : ''

  function getGenreMovies(genre: string) {
    setGenreId(genre)
  }

  return (
    <PageLayout>
      <Header />
      <main className="flex w-full flex-col px-8 py-4 pt-20">
        <section className="mb-8 flex w-full flex-wrap justify-end gap-2">
          <GenreSelect getGenreMovies={getGenreMovies} />
        </section>

        <section className="flex flex-col gap-8">
          <article className="flex w-full flex-col gap-6">
            <h1 className="text-2xl">{genreTitle}</h1>
            <section className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {genreMovies?.map(movie => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </section>
          </article>
        </section>
      </main>
    </PageLayout>
  )
}
