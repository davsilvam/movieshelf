'use client'

import { useMovies } from 'hooks/useMovies'
import { Star } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Tag } from './Tag'

export async function Banner() {
  const { popularMovies } = await useMovies()
  const hottestMovies = popularMovies.filter(
    (movie) => popularMovies.indexOf(movie) < 4,
  )

  return (
    <Swiper
      autoplay={{ delay: 8000 }}
      className="h-3/5 w-full"
      direction="horizontal"
      effect={'fade'}
      modules={[Autoplay, EffectFade, Pagination]}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      slidesPerView={1}
    >
      {hottestMovies.map((movie) => (
        <SwiperSlide className="h-full" key={movie.id}>
          <div
            className={`flex h-full flex-col justify-end gap-5 bg-opacity-75 bg-cover bg-top px-10 py-8 shadow-banner`}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="flex items-center gap-3">
              <Tag>🔥 Bombando</Tag>
              {movie.vote_average > 8.5 && <Tag>⭐ Queridinho</Tag>}
            </div>

            <strong className="font-alt text-7xl text-bunker-50">
              {movie.title}
            </strong>

            <div className="flex items-center gap-10">
              <button className="rounded-lg bg-bunker-50 px-8 py-3 font-semibold text-bunker-950">
                Sobre o filme
              </button>

              <div className="mt-2 flex items-center gap-5 font-alt text-4xl font-medium text-bunker-50">
                <Star className="mb-1.5 h-8 w-8 fill-pizazz text-pizazz" />
                {movie.vote_average}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
