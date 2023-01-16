import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { BookmarkIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { MovieSection, MovieType } from '../../components/MovieSection'
import { Sidebar } from '../../components/Sidebar'
import { useFavorites } from '../../contexts/FavoritesContext'
import { Comments } from './Comments'

export const MovieDetails: React.FC = () => {
  const { id } = useParams()
  const { favorites, toogleFavorite } = useFavorites()
  const [details, setDetails] = useState<MovieType>()

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=pt-BR`
    )
      .then(response => response.json())
      .then(data => {
        setDetails(data)
      })
  }, [])

  function handleMovieFavorite(id: number) {
    toogleFavorite(id)
  }

  return (
    <div className="flex min-h-screen w-full bg-darkest text-lightest">
      <Sidebar />
      <div className="flex max-w-[84%] flex-col pb-6">
        {details?.backdrop_path && (
          <div
            className="relative mb-6 h-[50vh] w-full bg-cover"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${details?.backdrop_path})`,
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 20px 60px 12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
            }}
          >
            <Link to="/">
              <button className="absolute top-2 left-2 flex items-center gap-1 rounded-lg bg-lightest py-1 px-2 text-sm font-semibold text-darkest">
                <ArrowLeftIcon className="w-4" />
                Voltar
              </button>
            </Link>
          </div>
        )}
        <div className="flex w-full flex-col gap-3 px-6">
          <header className="flex w-full items-center justify-between ">
            <h3 className="flex items-center gap-2 font-semibold">
              {details?.vote_average} <StarIcon className="w-5 text-main" />
            </h3>
            <div className="flex items-center gap-3">
              <BookmarkIcon className="w-7 cursor-pointer fill-transparent text-tertiary transition-colors hover:fill-tertiary" />
              <HeartIcon
                onClick={() => {
                  if (!details?.id) return
                  handleMovieFavorite(details?.id)
                }}
                className={`w-7 cursor-pointer fill-transparent text-secondary transition-colors hover:fill-secondary ${
                  favorites.some(id => details?.id === id) && 'fill-secondary'
                } `}
              />
            </div>
          </header>
          <h1>{details?.title}</h1>
          <div className="mb-3 flex items-center gap-2">
            {details?.genres.map(genre => (
              <span
                key={genre.id}
                className="rounded-lg bg-secondary py-1 px-2 text-xs font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="mb-8 text-cadet">{details?.overview}</p>

          {details?.id && (
            <MovieSection
              amount={4}
              movieURL={`https://api.themoviedb.org/3/movie/${
                details?.id
              }/recommendations?api_key=${
                import.meta.env.VITE_API_KEY
              }&language=pt-BR&page=1`}
              title="Recomendações"
            />
          )}

          {details?.id && <Comments id={details?.id} />}
        </div>
      </div>
    </div>
  )
}
