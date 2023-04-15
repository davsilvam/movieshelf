import { FC, Fragment } from 'react'

// components
import { MovieCard, MovieSkeleton } from './'

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
    <section className="flex w-full flex-col gap-4">
      {movies && movies?.length > 0 ? (
        <Fragment>
          <h2 className="text-xl">{title}</h2>
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
                    <MovieCard movie={movie} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment />
      )}
    </section>
  )
}
