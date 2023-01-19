import React, { useEffect, useState } from 'react'

// Icons
import {
  ArrowUpRightIcon,
  BookmarkIcon,
  StarIcon
} from '@heroicons/react/24/outline'

// Router
import { useNavigate } from 'react-router-dom'

// Services
import { ApiException } from '../../services/apiException'
import { MoviesService } from '../../services/apiServices'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper'
import { PaginationOptions } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Types
import { MovieType } from '../../@types/movies'

export const HottestMovieBanner: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>()
  const movieURL = `/movie/popular?api_key=${
    import.meta.env.VITE_API_KEY
  }&language=pt-BR`

  useEffect(() => {
    MoviesService.getMovies(movieURL).then(response => {
      if (response instanceof ApiException) {
        return console.log(response.message)
      }

      setMovies(response.results)
    })
  }, [])

  const navigate = useNavigate()

  function goToTheMoviePage(id: number) {
    navigate(`/movie/${id}`)
  }

  const pagination: PaginationOptions = {
    clickable: true,
    dynamicBullets: true
  }

  return (
    <div>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{ delay: 8000 }}
        effect={'fade'}
        // navigation
        pagination={pagination}
      >
        {movies?.slice(0, 5)?.map(movie => (
          <SwiperSlide className="h-[70vh] shadow-lg">
            <div
              className="relative mb-6 h-full w-full bg-cover max-lg:bg-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                boxShadow:
                  'rgba(50, 50, 93, 0.25) 0px 20px 60px 12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
              }}
            >
              <div className="banner-gradient absolute left-0 bottom-0 flex h-full w-full flex-col items-start justify-end py-8 px-6 pt-24 max-lg:gap-7 lg:w-[70%] lg:justify-between">
                <div className="flex w-full flex-col gap-2 lg:w-96">
                  <h1 className="text-5xl">{movie.title}</h1>
                  <h3 className="flex items-center gap-2 font-semibold">
                    <StarIcon className="w-5 text-main" /> {movie.vote_average}
                  </h3>
                  <p className="mt-1 text-sm">{movie.overview}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => goToTheMoviePage(movie.id)}
                    className="flex w-fit items-center gap-2 rounded-md bg-main py-3 px-6 font-bold shadow-md hover:saturate-200"
                  >
                    Visitar <ArrowUpRightIcon className="w-4" />
                  </button>
                  <button
                    onClick={() => goToTheMoviePage(movie.id)}
                    className="group flex w-fit items-center gap-2 rounded-md bg-darkest px-4 font-bold shadow-md transition-colors duration-300 hover:bg-secondary"
                  >
                    <BookmarkIcon className="w-5 transition-all duration-300 group-hover:fill-lightest" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
