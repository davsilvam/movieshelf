import { LinkButton } from 'components/Button'
import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'
import { Movie } from 'types/api'
import { movieGenres } from 'utils/movie-genres'

interface BannerCardProps {
  movie: Movie
}

export function BannerCard({ movie }: BannerCardProps) {
  return (
    <div
      className={`relative -z-10 flex h-full flex-col justify-between bg-opacity-75 bg-cover bg-top px-10 py-8 pt-32`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        boxShadow:
          '0px -80px 100px 0px #111214 inset, 260px -80px 100px 0px rgba(17, 18, 20, 0.75) inset',
      }}
    >
      <div className="absolute top-0 z-0 h-full w-full bg-woodsmoke/20" />

      <div className="z-10 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          {movie.genre_ids.map((genreId) => (
            <Fragment key={genreId}>
              {movie.genre_ids.indexOf(genreId) > 0 && (
                <div className="h-5 w-[1px] bg-oslo" />
              )}

              <p className="font-alt text-lg uppercase text-white">
                {movieGenres[genreId]}
              </p>
            </Fragment>
          ))}
        </div>

        <p
          className="max-w-lg font-alt text-6xl uppercase text-white"
          style={{ lineHeight: '72px' }}
        >
          {movie.title}
        </p>

        <div className="font-alt text-white">
          <p className="text-lg">
            <span className="text-4xl text-pizazz">{movie.vote_average} </span>/
            10
          </p>
          <p className="text-sm">Avaliação</p>
        </div>
      </div>

      <LinkButton
        href={`/movie/${movie.id}`}
        className="z-10"
        icon={ChevronRight}
      >
        Detalhes
      </LinkButton>
    </div>
  )
}
