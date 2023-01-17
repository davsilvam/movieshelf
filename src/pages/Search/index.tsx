import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../../components/Header'
import { MovieType } from '../../components/MovieSection'
import { Sidebar } from '../../components/Sidebar'

export const Search: React.FC = () => {
  const history = useNavigate()
  const [movies, setMovies] = useState<MovieType[]>([])
  const { id } = useParams()

  function goToTheMoviePage(id: number) {
    history(`/movie/${id}`)
  }

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=pt-BR&query=${id}&page=1&include_adult=false`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data.results)
        setMovies(data.results)
      })
  }, [id])

  return (
    <div className="flex min-h-screen w-full bg-darkest text-lightest">
      <Sidebar />
      <div className="flex w-full flex-col lg:max-w-[84%]">
        <Header />
        <main className="flex w-full flex-col px-8 py-4">
          <section className="grid gap-x-6 max-lg:gap-y-4 md:grid-cols-3 lg:grid-cols-4">
            {movies.map(movie => (
              <div
                className="group flex cursor-pointer flex-col gap-3"
                key={movie.id}
              >
                <img
                  onClick={() => goToTheMoviePage(movie.id)}
                  className="rounded-md"
                  src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                  alt={movie.title + 'Poster.'}
                />

                <div className="-z-10 -translate-y-[200%] transition-transform duration-300 group-hover:translate-y-0 max-lg:hidden">
                  <h3 className="text-center text-base">{movie.title}</h3>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
