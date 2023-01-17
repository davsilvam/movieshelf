import React from 'react'
import { useNavigate } from 'react-router-dom'

import { MovieType } from '../MovieSection'

interface MovieCardProps {
  movie: MovieType
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
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

      <div className="-z-10 -translate-y-[200%] transition-transform duration-300 group-hover:translate-y-0 max-lg:hidden">
        <h3 className="text-center text-base">{movie.title}</h3>
      </div>
    </>
  )
}
