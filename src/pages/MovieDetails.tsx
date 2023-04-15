import { FC, Fragment, useEffect, useState } from 'react'

// components
import {
  ActionButton,
  BaseButton,
  CommentsContainer,
  GoBackButton,
  MovieSection,
  ReviewInfo,
  UsersInfo
} from '../components'

// contexts
import { useShelf } from '../contexts/ShelfContext'

// hooks
import { useMovieDetails } from '../hooks'

// icons
import {
  Bookmark,
  BookmarkSimple,
  Heart,
  HeartHalf,
  Plus,
  SquaresFour
} from '@phosphor-icons/react'

// layout
import { PageLayout } from './'

// primitives
import { RatingMovieDialog, ToastMessage } from '../primitives'

// router
import { useParams } from 'react-router-dom'

// skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// utils
import { MOVIE_RECOMMENDATIONS_URL } from '../utils'

export const MovieDetails: FC = () => {
  const { id } = useParams()
  const { data: details, isFetching } = useMovieDetails(id)
  const {
    favorites,
    isMovieFavorite,
    isMovieOnTheShelf,
    isMovieSaved,
    saved,
    shelf,
    toogleFavorite,
    toogleSaved
  } = useShelf()

  const [isToastVisible, setToastVisible] = useState<boolean>(false)
  const [toastAction, setToastAction] = useState<string>('')

  function toogleToastVisible() {
    setToastVisible(state => !state)
  }

  useEffect(() => {
    if (!isFetching) {
      saved.some(movie => details?.id === movie.id)
        ? setToastAction('addToSaved')
        : setToastAction('removeFromSaved')

      toogleToastVisible()
    }
  }, [saved.length])

  useEffect(() => {
    if (!isFetching) {
      favorites.some(movie => details?.id === movie.id)
        ? setToastAction('addToFavorites')
        : setToastAction('removeFromFavorites')

      toogleToastVisible()
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
          <h1 className="text-3xl">{details?.title}</h1>
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
                className="rounded-lg bg-carnation py-1 px-2 text-xs font-medium"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))
          )}
        </div>

        <p className="mb-2 text-sm text-cadet">{details?.overview}</p>

        <div className="mb-8 flex items-center gap-5">
          {isFetching ? (
            <Skeleton
              baseColor="#1b1a27"
              className="h-12 w-60"
              highlightColor="#303030"
            />
          ) : (
            <Fragment>
              {isMovieOnTheShelf(details?.id) && (
                <BaseButton
                  className="cursor-not-allowed bg-secondary-400 text-sm font-semibold"
                  disabled
                >
                  <SquaresFour size={20} />
                  <span>Adicionado à estante</span>
                </BaseButton>
              )}

              {!isMovieOnTheShelf(details?.id) && (
                <RatingMovieDialog movieId={id}>
                  <BaseButton className="cursor-pointer bg-pizazz text-sm font-semibold">
                    <Plus size={20} weight="bold" />
                    <span>Adicionar à estante</span>
                  </BaseButton>
                </RatingMovieDialog>
              )}
            </Fragment>
          )}

          {isFetching ? (
            <Skeleton
              baseColor="#1b1a27"
              className="h-12 w-12"
              highlightColor="#303030"
            />
          ) : isMovieOnTheShelf(details?.id) ? (
            <ToastMessage
              action={toastAction}
              isToastVisible={isToastVisible}
              setToastVisible={toogleToastVisible}
            >
              <Fragment>
                {isMovieFavorite(details?.id) && (
                  <ActionButton
                    onClick={() => {
                      if (!details) return
                      toogleFavorite(details?.id)
                    }}
                    className="bg-carnation hover:saturate-150"
                  >
                    <Heart size={24} weight="fill" />
                  </ActionButton>
                )}

                {!isMovieFavorite(details?.id) && (
                  <ActionButton
                    onClick={() => {
                      if (!details) return
                      toogleFavorite(details?.id)
                    }}
                    className="bg-secondary-700 hover:bg-secondary-800"
                  >
                    <HeartHalf size={24} />
                  </ActionButton>
                )}
              </Fragment>
            </ToastMessage>
          ) : (
            <ToastMessage
              action={toastAction}
              isToastVisible={isToastVisible}
              setToastVisible={toogleToastVisible}
            >
              <Fragment>
                {isMovieSaved(details?.id) && (
                  <ActionButton
                    onClick={() => {
                      if (!details) return
                      toogleSaved(details?.id)
                    }}
                    className="bg-tertiary hover:saturate-150"
                  >
                    <Bookmark size={24} weight="fill" />
                  </ActionButton>
                )}

                {!isMovieSaved(details?.id) && (
                  <ActionButton
                    onClick={() => {
                      if (!details) return
                      toogleSaved(details.id)
                    }}
                    className="bg-secondary-700 hover:bg-secondary-800"
                  >
                    <BookmarkSimple size={24} />
                  </ActionButton>
                )}
              </Fragment>
            </ToastMessage>
          )}
        </div>

        {details?.id && (
          <Fragment>
            <div className="space-y-6">
              <MovieSection
                url={MOVIE_RECOMMENDATIONS_URL(details?.id)}
                title="Recomendações"
              />

              <CommentsContainer id={details?.id} />
            </div>
          </Fragment>
        )}
      </div>
    </PageLayout>
  )
}
