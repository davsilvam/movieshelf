import { FC } from 'react'

// Components
import { Header, MobileNavbar, MovieCard, Sidebar } from '../components/exports'

// Router
import { useParams } from 'react-router-dom'

// Services
import { instance } from '../services/apiConfig'

// Types
import { MovieType } from '../@types/tmdb'

// Query
import { useQuery } from 'react-query'

export const Search: FC = () => {
  const { id } = useParams()

  const { data: movies } = useQuery<MovieType[]>(['details', id], async () => {
    const SEARCH_MOVIES_URL = `/search/movie?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=pt-BR&query=${id}&page=1&include_adult=false`

    const { data } = await instance.get(SEARCH_MOVIES_URL)

    return data.results
  })

  return (
    <div className="flex min-h-screen w-full bg-secondary-900 text-secondary-50 max-md:pb-20">
      <Sidebar />
      <MobileNavbar />
      <div className="relative flex w-full flex-col lg:max-w-[84%]">
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
      </div>
    </div>
  )
}
