'use client'

import { Fragment } from 'react'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { LoadMovies, useHottestMovies } from 'hooks'

import { BannerCard } from './Card'
import { BannerSkeleton } from './Skeleton'

interface BannerSliderProps {
  loadHottestMovies: LoadMovies
}

export function BannerSlider({ loadHottestMovies }: BannerSliderProps) {
  const { hottestMovies, isLoading } = useHottestMovies({
    loadHottestMovies,
  })

  return (
    <Fragment>
      {isLoading ? (
        <BannerSkeleton />
      ) : (
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
            hottestMovies.map(movie => (
              <SwiperSlide className="h-full" key={movie.id}>
                <BannerCard movie={movie} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </Fragment>
  )
}
