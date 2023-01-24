import { FC } from 'react'

// Components
import { MovieCard } from '../MovieCard'

// Services
import { instance } from '../../services/apiConfig'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'

// Types
import { MovieType } from '../../@types/tmdb'

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
  const { data: movies } = useQuery<MovieType[]>(
    ['movies', movieURL],
    async () => {
      const { data } = await instance.get(movieURL)

      if (amount) {
        return data.results.slice(0, amount)
      }

      return data.results
    }
  )

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
