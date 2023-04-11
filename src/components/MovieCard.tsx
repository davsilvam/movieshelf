import { FC, Fragment } from 'react'

// components
import { useNavigate } from 'react-router-dom'

// types
import { MovieType } from '../@types/tmdb'

interface MovieCardProps {
  children?: React.ReactNode
  movie: MovieType
}

export const MovieCard: FC<MovieCardProps> = ({ children, movie }) => {
  const navigate = useNavigate()

  function goToTheMoviePage(id: number) {
    navigate(`/movie/${id}`)
  }

  return (
    <Fragment>
      <div className="relative">
        {movie.poster_path && (
          <img
            onClick={() => goToTheMoviePage(movie.id)}
            className="rounded-md"
            src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
            alt={movie.title + 'Poster.'}
            loading="lazy"
          />
        )}
      </div>

      {children}
    </Fragment>
  )
}
