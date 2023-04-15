import { FC } from 'react'

// components
import { useNavigate } from 'react-router-dom'

// icons
import { Star } from '@phosphor-icons/react'

// types
import { Movie } from '../@types/tmdb'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate()

  function goToTheMoviePage(id: number) {
    navigate(`/movie/${id}`)
  }

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
          <span className="flex items-center gap-1 text-pizazz">
            <Star size={12} weight="fill" />
            <p className="text-xs font-medium">
              {(movie.vote_average / 2).toFixed(1)}
            </p>
          </span>

          <p className="flex items-center gap-1 text-xs text-cadet">
            {movie.release_date.slice(0, 4)}
          </p>
        </div>
      </div>
    </div>
  )
}
