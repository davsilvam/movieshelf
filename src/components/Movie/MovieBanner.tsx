import { ChevronRight, Star } from 'lucide-react'
import { Movie } from 'types/api'

interface MovieBannerProps {
  movie: Movie
}

export function MovieBanner({ movie }: MovieBannerProps) {
  return (
    <div
      className="flex h-[400px] w-full flex-col items-end justify-between bg-cover bg-top p-10 shadow-genreBanner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <strong className="w-2/5 text-right font-alt text-6xl uppercase text-bunker-50">
        {movie.title}
      </strong>

      <div className="mt-2 flex items-center gap-5 font-alt text-4xl font-medium text-bunker-50">
        <Star className="mb-1.5 h-8 w-8 fill-pizazz text-pizazz" />
        {movie.vote_average}
      </div>

      <button className="flex items-center gap-1 rounded-lg bg-bunker-50 px-8 py-3 font-semibold text-bunker-950">
        Sobre o filme <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
