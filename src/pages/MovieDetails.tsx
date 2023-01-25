import { FC } from 'react'

// Components
import { Comments, MovieSection, Sidebar } from '../components/exports'

// Contexts
import { useFavorites } from '../contexts/FavoritesContext'

// Icons
import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import {
  BookmarkIcon,
  HeartIcon,
  SquaresPlusIcon,
  StarIcon
} from '@heroicons/react/24/outline'

// Router
import { useNavigate, useParams } from 'react-router-dom'

// Services
import { instance } from '../services/apiConfig'

// Types
import { MovieDetailsType } from '../@types/tmdb'

// Utils
import { GoToTop } from '../utils/GoToTop'

// Query
import { useQuery } from 'react-query'

export const MovieDetails: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { favorites, toogleFavorite } = useFavorites()

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

  function handleMovieFavorite(id: number) {
    toogleFavorite(id)
  }

  function goBack() {
    navigate(-1)
  }

  return (
    <div className="flex min-h-screen w-full bg-darkest text-lightest">
      <Sidebar />
      <div className="flex w-full flex-col pb-6 lg:max-w-[80%] xl:max-w-[84%]">
        {details?.backdrop_path && (
          <div
            className="relative mb-6 h-[50vh] w-full bg-cover max-lg:bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${details?.backdrop_path})`,
              boxShadow:
                'rgba(50, 50, 93, 0.25) 0px 20px 60px 12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
            }}
          >
            <button
              onClick={goBack}
              className="absolute top-2 left-2 flex items-center gap-1 rounded-lg bg-lightest py-1 px-2 text-sm font-semibold text-darkest transition-all hover:bg-opacity-75"
            >
              <ArrowLeftIcon className="w-4" />
              Voltar
            </button>
          </div>
        )}
        <div className="flex w-full flex-col gap-3 px-6">
          <header className="flex w-full items-center justify-between ">
            <h3 className="flex items-center gap-2 font-semibold">
              <StarIcon className="w-5 text-main" /> {details?.vote_average}{' '}
              <div className="h-4 w-px bg-lightest"></div>
              <span className="text-sm">{details?.vote_count}</span>
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
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {details?.genres.map(genre => (
              <span
                key={genre.id}
                className="rounded-lg bg-secondary py-1 px-2 text-xs font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="mb-2 text-cadet">{details?.overview}</p>

          <button className="mb-8 flex w-fit items-center gap-2 rounded-md bg-main py-3 px-6 text-sm font-bold shadow-md transition-all duration-300 hover:saturate-200">
            <SquaresPlusIcon className="w-5" />
            Adicionar à estante
          </button>

          {details?.id && (
            <div className="mb-8 lg:w-[75%]">
              <MovieSection
                amount={4}
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
      </div>
      <GoToTop />
    </div>
  )
}
