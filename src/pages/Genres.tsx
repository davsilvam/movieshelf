import { FC, useState } from 'react'

// Components
import { Header, MovieCard } from '../components'
import { GenreSelect } from '../primitives'

// Layout
import { PageLayout } from './PageLayout'

// Services
import { api } from '../services/api'

// Types
import { GenreType, MovieType } from '../@types/tmdb'

// Query
import { useQuery } from '@tanstack/react-query'

export const Genres: FC = () => {
  const [genreId, setGenreId] = useState<string>()

  const { data: genreMovies } = useQuery<MovieType[]>(
    ['genreMovies', genreId],
    async () => {
      if (!genreId) return

      const GENRE_MOVIES_URL = `/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&with_genres=${genreId}&language=pt-BR`

      const { data } = await api.get(GENRE_MOVIES_URL)

      return data.results
    }
  )

  const { data: genres } = useQuery<GenreType[]>(['genres'], async () => {
    const GENRES_URL = `/genre/movie/list?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=pt-BR`

    const { data } = await api.get(GENRES_URL)

    return data.genres
  })

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
          <article className="flex w-full flex-col gap-8">
            <h1>{genreTitle}</h1>
            <section className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {genreMovies?.map(movie => (
                <div className="cursor-pointer" key={movie.id}>
                  <MovieCard key={movie.id} movie={movie} />
                </div>
              ))}
            </section>
          </article>
        </section>
      </main>
    </PageLayout>
  )
}
