import { FC } from 'react'

// Components
import { useNavigate } from 'react-router-dom'

// Types
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
    <>
      <img
        onClick={() => goToTheMoviePage(movie.id)}
        className="rounded-md"
        src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
        alt={movie.title + 'Poster.'}
      />

      {children}
    </>
  )
}
