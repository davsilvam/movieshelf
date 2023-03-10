import { FC } from 'react'

// Components
import { MovieCard } from './MovieCard'

// Icons
import { StarIcon } from '@heroicons/react/20/solid'

// Services
import { instance } from '../services/apiConfig'

// Skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

// Types
import { MovieType } from '../@types/tmdb'

// Query
import { useQuery } from 'react-query'

interface MovieSectionProps {
  movieURL: string
  title: string
  amount?: number
}

export const MovieSection: FC<MovieSectionProps> = ({
  movieURL,
  title,
  amount
}) => {
  const { data: movies, isFetching } = useQuery<MovieType[]>(
    ['movies', movieURL],
    async () => {
      const { data } = await instance.get(movieURL)

      if (amount) {
        return data.results.slice(0, amount)
      }

      return data.results
    }
  )

  function skeletonBreakpoints() {
    const tabletBreakpoint = 640
    const desktopBreakpoint = 1280

    if (window.innerWidth < tabletBreakpoint) {
      return 3
    } else if (window.innerWidth < desktopBreakpoint) {
      return 4
    }

    return 5
  }

  return (
    <section className="flex w-full flex-col gap-6">
      <h2>{title}</h2>
      <div className="flex w-full">
        {isFetching ? (
          <Skeleton
            baseColor="#1b1a27"
            className="h-[148px] w-[96px] rounded-md md:h-[196px] md:w-[142px] xl:h-[240px] xl:w-[160px]"
            containerClassName={`flex ${
              skeletonBreakpoints() < 4
                ? 'gap-[30px]'
                : skeletonBreakpoints() < 5
                ? 'gap-[40px]'
                : 'gap-[45px]'
            }`}
            count={skeletonBreakpoints()}
            highlightColor="#303030"
            inline={true}
          />
        ) : (
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode]}
            touchEventsTarget={'container'}
            breakpoints={{
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
            }}
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
