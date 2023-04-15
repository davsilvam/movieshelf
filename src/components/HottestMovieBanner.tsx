import { FC, Fragment } from 'react'

// components
import { ActionButton, BaseButton } from './'

// contexts
import { useShelf } from '../contexts/ShelfContext'

// icons
import {
  ArrowUpRight,
  Bookmark,
  BookmarkSimple,
  Heart,
  HeartHalf,
  Star
} from '@phosphor-icons/react'

// hooks
import { useMovies } from '../hooks'

// router
import { useNavigate } from 'react-router-dom'

// skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// utils
import { POPULAR_MOVIES_URL } from '../utils'

export const HottestMovieBanner: FC = () => {
  const {
    isMovieFavorite,
    isMovieOnTheShelf,
    isMovieSaved,
    toogleFavorite,
    toogleSaved
  } = useShelf()
  const navigate = useNavigate()

  const { data: movies, isLoading } = useMovies(POPULAR_MOVIES_URL)
  const hottestMovies = movies?.slice(0, 5)

  function goToTheMoviePage(id: number) {
    navigate(`/movie/${id}`)
  }

  return (
    <div className="w-full">
      {isLoading ? (
        <Skeleton
          baseColor="#1b1a27"
          className="h-[70vh] w-full"
          highlightColor="#303030"
        />
      ) : (
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          autoplay={{ delay: 8000 }}
          effect={'fade'}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
        >
          {hottestMovies?.map(movie => (
            <SwiperSlide className="h-[70vh] shadow-lg" key={movie.id}>
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
                    <h1 className="text-4xl">{movie.title}</h1>

                    <span className="flex items-center gap-2 font-semibold">
                      <Star size={20} className="text-pizazz" />
                      <p>{(movie.vote_average / 2).toFixed(1)}</p>
                    </span>

                    <p className="mt-1 text-xs max-lg:hidden">
                      {movie.overview}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <BaseButton
                      onClick={() => goToTheMoviePage(movie.id)}
                      aria-labelledby="visitar página do filme"
                      className="bg-pizazz text-sm font-semibold"
                    >
                      <span>Visitar</span>
                      <ArrowUpRight size={16} />
                    </BaseButton>

                    {isMovieOnTheShelf(movie.id) ? (
                      <Fragment>
                        {isMovieFavorite(movie.id) && (
                          <ActionButton
                            onClick={() => toogleFavorite(movie.id)}
                            className="bg-carnation hover:saturate-150"
                          >
                            <Heart size={24} weight="fill" />
                          </ActionButton>
                        )}

                        {!isMovieFavorite(movie.id) && (
                          <ActionButton
                            onClick={() => toogleFavorite(movie.id)}
                            className="bg-secondary-900 hover:bg-secondary-700"
                          >
                            <HeartHalf size={24} />
                          </ActionButton>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment>
                        {isMovieSaved(movie.id) && (
                          <ActionButton
                            onClick={() => toogleSaved(movie.id)}
                            className="bg-tertiary hover:saturate-150"
                          >
                            <Bookmark size={24} weight="fill" />
                          </ActionButton>
                        )}

                        {!isMovieSaved(movie.id) && (
                          <ActionButton
                            onClick={() => toogleSaved(movie.id)}
                            className="bg-secondary-900 hover:bg-secondary-700"
                          >
                            <BookmarkSimple size={24} />
                          </ActionButton>
                        )}
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
