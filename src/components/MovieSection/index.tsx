import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

interface MovieSectionProps {
  movieURL: string
  title: string
  amount?: number
}

export type MovieType = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  genres: { id: number; name: string }[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export const MovieSection: React.FC<MovieSectionProps> = ({
  movieURL,
  title,
  amount
}) => {
  const [movies, setMovies] = useState<MovieType[]>([])
  const history = useNavigate()

  function goToTheMoviePage(id: number) {
    history(`/movie/${id}`)
  }

  useEffect(() => {
    fetch(movieURL)
      .then(response => response.json())
      .then(data => {
        if (amount) {
          return setMovies(data.results.slice(0, amount))
        }
        setMovies(data.results)
      })
  }, [movieURL])

  return (
    <section className="flex w-full flex-col gap-6">
      <h2>{title}</h2>
      <div className="flex w-full">
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          breakpoints={{
            0: {
              slidesPerView: amount ? amount : 3,
              spaceBetween: 30
            },
            640: {
              slidesPerView: amount ? amount : 4,
              spaceBetween: 40
            },
            769: {
              slidesPerView: amount ? amount : 4,
              spaceBetween: 45
            },
            1280: {
              slidesPerView: amount ? amount : 5,
              spaceBetween: 50
            }
          }}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={swiper => console.log(swiper)}
        >
          {movies.map(movie => (
            <SwiperSlide
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
