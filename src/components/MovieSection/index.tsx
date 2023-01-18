import React, { useEffect, useState } from 'react'

// Components
import { MovieCard } from '../MovieCard'

// Services
import { ApiException } from '../../services/apiException'
import { MoviesService } from '../../services/apiServices'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

// Types
import { MovieType } from '../../@types/movies'

interface MovieSectionProps {
  movieURL: string
  title: string
  amount?: number
}

export const MovieSection: React.FC<MovieSectionProps> = ({
  movieURL,
  title,
  amount
}) => {
  const [movies, setMovies] = useState<MovieType[]>([])

  useEffect(() => {
    MoviesService.getMovies(movieURL).then(response => {
      if (response instanceof ApiException) {
        return console.log(response.message)
      }

      if (amount) {
        return setMovies(response.results.slice(0, amount))
      }

      setMovies(response.results)
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
        >
          {movies.map(movie => (
            <SwiperSlide
              className="group flex cursor-pointer flex-col gap-3"
              key={movie.id}
            >
              <MovieCard movie={movie}>
                <div className="-z-10 -translate-y-[200%] transition-transform duration-300 group-hover:translate-y-0 max-lg:hidden">
                  <h3 className="text-center text-base">{movie.title}</h3>
                </div>
              </MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
