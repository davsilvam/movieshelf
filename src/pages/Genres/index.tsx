import React, { useEffect, useMemo, useState } from 'react'

// Components
import { Header, MovieCard, Sidebar } from '../../components'
import { ApiException } from '../../services/apiException'
import { MoviesService } from '../../services/apiServices'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

// Types
import { GenreType, MovieType } from '../../@types/movies'

type GenreCollection = {
  id: number
  movies: MovieType[]
}

export const Genres: React.FC = () => {
  const [genres, setGenres] = useState<GenreType[]>([])
  const [activeGenres, setActiveGenres] = useState<number[]>([])
  const [activeGenresCollection, setActiveGenresCollection] = useState<
    GenreCollection[]
  >([])

  function handleMovieGenre(id: number) {
    if (activeGenres.includes(id)) {
      return setActiveGenres(state => [...state.filter(item => item !== id)])
    }

    setActiveGenres(state => [...state, id])
  }

  const getMoviesByGenre = useMemo(() => {
    const moviesFilteredByGenre: GenreCollection[] = []

    activeGenres.map(id => {
      if (!id) return

      MoviesService.getMovieByGenre(id).then(response => {
        if (response instanceof ApiException) {
          return console.log(response.message)
        }

        moviesFilteredByGenre.push({ id: id, movies: response.results })

        setActiveGenresCollection(moviesFilteredByGenre)
      })
    })
  }, [activeGenres])

  useEffect(() => {
    MoviesService.getGenres().then(response => {
      if (response instanceof ApiException) {
        return console.log(response.message)
      }

      setGenres([...response.genres])
    })
  }, [])

  useEffect(() => {
    if (activeGenres.length === 0) setActiveGenresCollection([])
    getMoviesByGenre
  }, [activeGenres])

  return (
    <div className="flex min-h-screen w-full bg-darkest text-lightest">
      <Sidebar />
      <div className="relative flex w-full flex-col lg:max-w-[84%]">
        <Header />
        <main className="flex w-full flex-col px-8 py-4 pt-20">
          <section className="mb-8 flex flex-wrap gap-2">
            {genres.map(genre => (
              <span
                onClick={() => handleMovieGenre(genre.id)}
                className={`cursor-pointer rounded-lg border  py-1 px-3 text-sm font-medium ${
                  activeGenres.includes(genre.id)
                    ? 'border-main text-main'
                    : 'border-cadet text-cadet hover:border-lightest hover:text-lightest'
                }`}
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </section>
          <section className="flex flex-col gap-8">
            {activeGenresCollection.map(collection => (
              <article className="flex w-full flex-col gap-3">
                <h3>
                  {genres.filter(genre => genre.id === collection.id)[0].name}
                </h3>
                <div>
                  <Swiper
                    freeMode={true}
                    grabCursor={true}
                    modules={[FreeMode]}
                    breakpoints={{
                      0: {
                        slidesPerView: 3,
                        spaceBetween: 30
                      },
                      640: {
                        slidesPerView: 4,
                        spaceBetween: 40
                      },
                      769: {
                        slidesPerView: 4,
                        spaceBetween: 45
                      },
                      1280: {
                        slidesPerView: 5,
                        spaceBetween: 50
                      }
                    }}
                  >
                    {collection.movies.map(movie => (
                      <SwiperSlide>
                        <MovieCard key={movie.id} movie={movie} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
