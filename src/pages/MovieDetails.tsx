import { FC, useEffect, useState } from 'react'

// Components
import {
  Comments,
  GoBackButton,
  MovieSection,
  ReviewInfo,
  UsersInfo
} from '../components/exports'

// Contexts
import { useShelf } from '../contexts/ShelfContext'

// Icons
import {
  BookmarkIcon,
  HeartIcon,
  Squares2X2Icon,
  SquaresPlusIcon
} from '@heroicons/react/24/outline'

// Layout
import { PageLayout } from './PageLayout'

// Primitives
import {
  RatingMovieDialog,
  ToastMessage,
  TooltipMessage
} from '../primitives/exports'

// Router
import { useParams } from 'react-router-dom'

// Services
import { instance } from '../services/apiConfig'

// Skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Types
import { MovieDetailsType } from '../@types/tmdb'

// Query
import { useQuery } from 'react-query'

type ToastConfig = {
  isOpen: boolean
  action: string
}

export const MovieDetails: FC = () => {
  const { id } = useParams()
  const { toogleSaved, favorites, saved, shelf, toogleFavorite } = useShelf()
  const [toastConfig, setToastConfig] = useState<ToastConfig>({
    isOpen: false,
    action: ''
  })

  const { data: details, isFetching } = useQuery<MovieDetailsType>(
    ['details', id],
    async () => {
      const MOVIE_DETAILS_URL = `/movie/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=pt-BR`

      const { data } = await instance.get(MOVIE_DETAILS_URL)

      return data
    }
  )

  function movieIsOnTheShelf() {
    return shelf.some(movie => movie.id === details?.id)
  }

  function handleMovieFavorite(id: number) {
    toogleFavorite(id)
  }

  function handleMovieSave(id: number) {
    toogleSaved(id)
  }

  useEffect(() => {
    if (!isFetching) {
      saved.some(movie => details?.id === movie.id)
        ? setToastConfig({ isOpen: true, action: 'addToSaved' })
        : setToastConfig({ isOpen: true, action: 'removeFromSaved' })

      setTimeout(() => setToastConfig({ isOpen: false, action: '' }), 5000)
    }
  }, [saved.length])

  useEffect(() => {
    if (!isFetching) {
      favorites.some(movie => details?.id === movie.id)
        ? setToastConfig({ isOpen: true, action: 'addToFavorites' })
        : setToastConfig({ isOpen: true, action: 'removeFromFavorites' })

      setTimeout(() => setToastConfig({ isOpen: false, action: '' }), 5000)
    }
  }, [favorites.length])

  return (
    <PageLayout>
      {isFetching ? (
        <Skeleton
          baseColor="#1b1a27"
          className="mb-6 h-[50vh] w-full"
          highlightColor="#303030"
        />
      ) : (
        <div
          className="relative mb-6 h-[50vh] w-full bg-cover max-lg:bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${details?.backdrop_path})`,
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 20px 60px 12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
          }}
        >
          <GoBackButton />
        </div>
      )}
      <div className="flex w-full flex-col gap-3 px-6">
        {isFetching ? (
          <Skeleton
            baseColor="#1b1a27"
            className="h-8 w-32"
            highlightColor="#303030"
          />
        ) : (
          <header className="flex w-full items-center justify-between">
            {shelf.find(movie => movie.id === Number(id)) && (
              <ReviewInfo id={Number(id)} />
            )}
            <UsersInfo details={details} />
          </header>
        )}

        {isFetching ? (
          <Skeleton
            baseColor="#1b1a27"
            className="h-10 w-48"
            highlightColor="#303030"
          />
        ) : (
          <h1>{details?.title}</h1>
        )}
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {isFetching ? (
            <Skeleton
              baseColor="#1b1a27"
              className="mr-3 h-5 w-16"
              count={3}
              inline={true}
              highlightColor="#303030"
            />
          ) : (
            details?.genres.map(genre => (
              <span
                key={genre.id}
                className="rounded-lg bg-carnation py-1 px-2 text-xs font-medium"
              >
                {genre.name}
              </span>
            ))
          )}
        </div>
        <p className="mb-2 text-cadet">{details?.overview}</p>
        <div className="mb-8 flex items-center gap-5">
          <RatingMovieDialog movieId={id}>
            {isFetching ? (
              <Skeleton
                baseColor="#1b1a27"
                className="mb-8 h-12 w-60"
                highlightColor="#303030"
              />
            ) : (
              <button
                className={`flex h-12 w-fit items-center gap-2 rounded-md py-3 px-6 text-sm font-bold shadow-md transition-all duration-300 hover:saturate-200 ${
                  movieIsOnTheShelf()
                    ? 'cursor-not-allowed bg-secondary-400'
                    : 'cursor-pointer bg-pizazz'
                }`}
                disabled={movieIsOnTheShelf()}
              >
                {movieIsOnTheShelf() ? (
                  <Squares2X2Icon className="w-5" />
                ) : (
                  <SquaresPlusIcon className="w-5" />
                )}
                {movieIsOnTheShelf()
                  ? 'Adicionado à estante'
                  : 'Adicionar à estante'}
              </button>
            )}
          </RatingMovieDialog>
          {isFetching ? (
            <Skeleton
              baseColor="#1b1a27"
              className="h-8 w-20"
              highlightColor="#303030"
            />
          ) : movieIsOnTheShelf() ? (
            <ToastMessage toastConfig={toastConfig}>
              <TooltipMessage
                message={
                  favorites.some(movie => details?.id === movie.id)
                    ? 'Remover dos Favoritos'
                    : 'Adicionar aos Favoritos'
                }
              >
                <button
                  className={`group flex h-12 w-12 items-center justify-center rounded-md ${
                    favorites.some(movie => details?.id === movie.id)
                      ? 'bg-carnation hover:saturate-150'
                      : 'bg-secondary-700 hover:bg-secondary-800'
                  }`}
                  onClick={() => {
                    if (!details?.id) return
                    handleMovieFavorite(details?.id)
                  }}
                >
                  <HeartIcon
                    className={`w-7 cursor-pointer text-secondary-50 transition-colors group-hover:fill-secondary-50 ${
                      favorites.some(movie => details?.id === movie.id)
                        ? 'fill-secondary-50'
                        : 'fill-transparent'
                    }`}
                  />
                </button>
              </TooltipMessage>
            </ToastMessage>
          ) : (
            <ToastMessage toastConfig={toastConfig}>
              <TooltipMessage
                message={
                  saved.some(movie => details?.id === movie.id)
                    ? 'Remover dos Salvos'
                    : 'Adicionar aos Salvos'
                }
              >
                <button
                  className={`group flex h-12 w-12 items-center justify-center rounded-md ${
                    saved.some(movie => details?.id === movie.id)
                      ? 'bg-tertiary hover:saturate-150'
                      : 'bg-secondary-700 hover:bg-secondary-800'
                  }`}
                  onClick={() => {
                    if (!details?.id) return
                    handleMovieSave(details?.id)
                  }}
                >
                  <BookmarkIcon
                    className={`w-6 cursor-pointer text-secondary-50 transition-colors group-hover:fill-secondary-50 ${
                      saved.some(movie => details?.id === movie.id)
                        ? 'fill-secondary-50'
                        : 'fill-transparent'
                    }`}
                  />
                </button>
              </TooltipMessage>
            </ToastMessage>
          )}
        </div>
        {details?.id && (
          <div className="mb-8 lg:w-[75%]">
            <MovieSection
              movieURL={`https://api.themoviedb.org/3/movie/${
                details?.id
              }/recommendations?api_key=${
                import.meta.env.VITE_API_KEY
              }&language=pt-BR&page=1`}
              title="Recomendações"
            />
          </div>
        )}
        {details?.id && <Comments id={details?.id} />}
      </div>
    </PageLayout>
  )
}
