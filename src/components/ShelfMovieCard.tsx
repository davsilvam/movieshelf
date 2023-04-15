import { FC } from 'react'

// components
import { useNavigate } from 'react-router-dom'

// contexts
import { useShelf } from '../contexts/ShelfContext'

// icons
import { Bookmark, Heart, Star } from '@phosphor-icons/react'

// types
import { Movie } from '../@types/tmdb'

interface ShelfMovieCardProps {
  movie: Movie

  movieStatus: 'shelf' | 'favorite' | 'saved'
}

export const ShelfMovieCard: FC<ShelfMovieCardProps> = ({
  movie,
  movieStatus = 'shelf'
}) => {
  const { favorites, shelf } = useShelf()
  const navigate = useNavigate()

  function goToTheMoviePage(id: number) {
    navigate(`/movie/${id}`)
  }

  const userMovie = (id: number) =>
    shelf.find(shelfMovie => shelfMovie.id === id)

  return (
    <div
      onClick={() => goToTheMoviePage(movie.id)}
      className="flex flex-col gap-3"
    >
      {movie.poster_path && (
        <img
          className="rounded-md"
          src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
          alt={`${movie.title} poster.`}
          loading="lazy"
        />
      )}

      <div className="flex w-full flex-col items-start justify-start gap-0.5">
        <strong className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-start text-sm">
          {movie.title}
        </strong>

        <div className="flex w-full items-center justify-between">
          {movieStatus === 'shelf' && (
            <span className="flex items-center gap-1 text-pizazz">
              <Star size={12} weight="fill" />
              <p className="text-xs font-medium">{userMovie(movie.id)?.rate}</p>
            </span>
          )}

          {favorites.some(favorite => favorite.id === movie.id) && (
            <Heart size={12} weight="fill" className="text-carnation" />
          )}
        </div>

        {movieStatus === 'saved' && (
          <Bookmark size={12} weight="fill" className="text-tertiary" />
        )}
      </div>
    </div>
  )
}
