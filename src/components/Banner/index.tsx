'use client'

import { useMovies } from 'hooks/useMovies'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { BannerCard } from './BannerCard'

export function Banner() {
  const { popularMovies } = useMovies()
  const hottestMovies =
    popularMovies &&
    popularMovies.filter((movie) => popularMovies.indexOf(movie) < 4)

  return (
    <Swiper
      autoplay={{ delay: 8000 }}
      className="h-[80vh] w-full"
      direction="horizontal"
      effect={'fade'}
      modules={[Autoplay, EffectFade, Pagination]}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      slidesPerView={1}
    >
      {hottestMovies &&
        hottestMovies.map((movie) => (
          <SwiperSlide className="h-full" key={movie.id}>
            <BannerCard movie={movie} />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
