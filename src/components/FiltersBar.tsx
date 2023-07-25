'use client'

import { useSearchParams } from 'next/navigation'
import { Fragment } from 'react'

import { Plus, X } from 'lucide-react'

import { cn, movieGenres } from 'utils'

interface Queries {
  [query: string]: {
    has: boolean
    value: string | null
  }
}

export function FiltersBar() {
  const searchParams = useSearchParams()

  const queries: Queries = {
    releaseDateGTE: {
      has: searchParams.has('release_date.gte'),
      value: searchParams.get('release_date.gte'),
    },
    releaseDateLTE: {
      has: searchParams.has('release_date.lte'),
      value: searchParams.get('release_date.lte'),
    },
    sortBy: {
      has: searchParams.has('sort_by'),
      value: searchParams.get('sort_by'),
    },
    voteAverageGTE: {
      has: searchParams.has('vote_average.gte'),
      value: searchParams.get('vote_average.gte'),
    },
    voteAverageLTE: {
      has: searchParams.has('vote_average.lte'),
      value: searchParams.get('vote_average.lte'),
    },
    voteCountGTE: {
      has: searchParams.has('vote_count.gte'),
      value: searchParams.get('vote_count.gte'),
    },
    voteCountLTE: {
      has: searchParams.has('vote_count.lte'),
      value: searchParams.get('vote_count.lte'),
    },
    withGenres: {
      has: searchParams.has('with_genres'),
      value: searchParams.get('with_genres'),
    },
    withRuntimeGTE: {
      has: searchParams.has('with_runtime.gte'),
      value: searchParams.get('with_runtime.gte'),
    },
    withRuntimeLTE: {
      has: searchParams.has('with_runtime.lte'),
      value: searchParams.get('with_runtime.lte'),
    },
  }

  const filterStyle = cn(
    'flex items-center gap-2',
    'rounded px-2 py-1',
    'bg-shark',
    'text-xs font-medium',
  )

  return (
    <ul className="flex flex-wrap items-center gap-3 text-white">
      {queries.releaseDateGTE.has && (
        <li className={filterStyle}>
          <p>
            Lançados <span className="font-normal text-oslo">depois de</span>{' '}
            {queries.releaseDateGTE.value}
          </p>

          <button>
            <X className="h-3 w-3" />
          </button>
        </li>
      )}

      {queries.releaseDateLTE.has && (
        <li className={filterStyle}>
          <p>
            Lançados <span className="font-normal text-oslo">antes de</span>{' '}
            {queries.releaseDateLTE.value}
          </p>

          <button>
            <X className="h-3 w-3" />
          </button>
        </li>
      )}

      {queries.voteAverageGTE.has && (
        <li className={filterStyle}>
          <p>
            Avaliação <span className="font-normal text-oslo">maior que</span>{' '}
            {queries.voteAverageGTE.value}
          </p>

          <button>
            <X className="h-3 w-3" />
          </button>
        </li>
      )}

      {queries.voteAverageLTE.has && (
        <li className={filterStyle}>
          <p>
            Avaliação <span className="font-normal text-oslo">menor que</span>{' '}
            {queries.voteAverageLTE.value}
          </p>

          <button>
            <X className="h-3 w-3" />
          </button>
        </li>
      )}

      {queries.voteCountGTE.has && (
        <li className={filterStyle}>
          <p>
            Nº de Avaliações{' '}
            <span className="font-normal text-oslo">maior que</span>{' '}
            {queries.voteCountGTE.value}
          </p>

          <button>
            <X className="h-3 w-3" />
          </button>
        </li>
      )}

      {queries.voteCountLTE.has && (
        <li className={filterStyle}>
          <p>
            Nº de Avaliações{' '}
            <span className="font-normal text-oslo">menor que</span>{' '}
            {queries.voteCountLTE.value}
          </p>

          <button>
            <X className="h-3 w-3" />
          </button>
        </li>
      )}

      {queries.withGenres.has && (
        <li className={filterStyle}>
          <p>
            Gêneros:{' '}
            {queries.withGenres.value && (
              <Fragment>
                {queries.withGenres.value.split(',').map((genreId) => {
                  const genreIds = queries.withGenres.value
                    ? queries.withGenres.value.split(',')
                    : []

                  return (
                    <Fragment key={genreId}>
                      {movieGenres[Number(genreId)] +
                        (genreIds.indexOf(genreId) + 1 < genreIds.length
                          ? ', '
                          : '')}
                    </Fragment>
                  )
                })}
              </Fragment>
            )}
          </p>

          <button>
            <X className="h-3 w-3" />
          </button>
        </li>
      )}

      {queries.withRuntimeGTE.has && (
        <li className={filterStyle}>
          <p>
            Duração <span className="font-normal text-oslo">maior que</span>{' '}
            {queries.withRuntimeGTE.value} minutos
          </p>

          <button>
            <X className="h-3 w-3" />
          </button>
        </li>
      )}

      {queries.withRuntimeLTE.has && (
        <li className={filterStyle}>
          <p>
            Duração <span className="font-normal text-oslo">menor que</span>{' '}
            {queries.withRuntimeLTE.value} minutos
          </p>

          <button>
            <X className="h-3 w-3" />
          </button>
        </li>
      )}

      <button className="flex items-center gap-2 rounded border border-dashed border-oslo px-2 py-1 text-xs font-medium text-oslo transition-colors hover:border-white hover:text-white">
        Adicionar filtro
        <Plus className="h-3 w-3" />
      </button>
    </ul>
  )
}
