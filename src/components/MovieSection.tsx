import { FC } from 'react'

// components
import { MovieCard, MovieSkeleton } from './'

// icons
import { StarIcon } from '@heroicons/react/20/solid'

// hooks
import { useMovies } from '../hooks'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

interface MovieSectionProps {
  url: string
  title: string
  amount?: number
}

export const MovieSection: FC<MovieSectionProps> = ({ url, title, amount }) => {
  const { data: movies, isLoading } = useMovies(url, amount)

  const swiperBreakpoints = {
    0: {
      slidesPerView: amount ?? 3,
      spaceBetween: 30
    },
    640: {
      slidesPerView: amount ?? 4,
      spaceBetween: 40
    },
    769: {
      slidesPerView: amount ?? 4,
      spaceBetween: 45
    },
    1280: {
      slidesPerView: amount ?? 5,
      spaceBetween: 50
    }
  }

  return (
    <section className="flex w-full flex-col gap-6">
      <h2>{title}</h2>
      <div className="flex w-full">
        {isLoading ? (
          <MovieSkeleton />
        ) : (
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode]}
            touchEventsTarget={'container'}
            breakpoints={swiperBreakpoints}
          >
            {movies?.map(movie => (
              <SwiperSlide
                className="relative flex cursor-pointer flex-col gap-3"
                key={movie.id}
              >
                <MovieCard movie={movie}>
                  <div className="mt-1 flex w-full flex-col items-start justify-start gap-[2px]">
                    <h3 className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-start text-sm">
                      {movie.title}
                    </h3>

                    <div className="flex w-full items-center justify-between">
                      <span className="flex items-center gap-1 text-pizazz">
                        <StarIcon className="w-3" />
                        <h4 className="pt-[1.75px] text-xs">
                          {(movie.vote_average / 2).toFixed(1)}
                        </h4>
                      </span>

                      <span className="flex items-center gap-1 text-cadet">
                        <h4 className="text-xs">
                          {movie.release_date.slice(0, 4)}
                        </h4>
                      </span>
                    </div>
                  </div>
                </MovieCard>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  )
}
