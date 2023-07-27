'use client'

import { Fragment } from 'react'

import { useFiltersBar } from './hooks'
import { cn, movieGenres } from 'utils'

import { FilterTag } from './FilterTag'

export function FiltersBar() {
  const { queries, removeFilter } = useFiltersBar()

  const filterStyle = cn(
    'flex items-center gap-2',
    'rounded px-2 py-1',
    'text-xs font-medium',
    'bg-shark',
  )

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-wrap items-center gap-3 text-white">
        {queries.releaseDateGTE.has && (
          <li className={filterStyle}>
            <FilterTag
              removeFilter={removeFilter}
              searchParam={queries.releaseDateGTE.searchParam}
            >
              Lançados <span className="font-normal text-oslo">depois de</span>{' '}
              {queries.releaseDateGTE.value}
            </FilterTag>
          </li>
        )}

        {queries.releaseDateLTE.has && (
          <li className={filterStyle}>
            <FilterTag
              removeFilter={removeFilter}
              searchParam={queries.releaseDateLTE.searchParam}
            >
              Lançados <span className="font-normal text-oslo">antes de</span>{' '}
              {queries.releaseDateLTE.value}
            </FilterTag>
          </li>
        )}

        {queries.voteAverageGTE.has && (
          <li className={filterStyle}>
            <FilterTag
              removeFilter={removeFilter}
              searchParam={queries.voteAverageGTE.searchParam}
            >
              Avaliação <span className="font-normal text-oslo">maior que</span>{' '}
              {queries.voteAverageGTE.value}
            </FilterTag>
          </li>
        )}

        {queries.voteAverageLTE.has && (
          <li className={filterStyle}>
            <FilterTag
              removeFilter={removeFilter}
              searchParam={queries.voteAverageLTE.searchParam}
            >
              Avaliação <span className="font-normal text-oslo">menor que</span>{' '}
              {queries.voteAverageLTE.value}
            </FilterTag>
          </li>
        )}

        {queries.voteCountGTE.has && (
          <li className={filterStyle}>
            <FilterTag
              removeFilter={removeFilter}
              searchParam={queries.voteCountGTE.searchParam}
            >
              Nº de Avaliações{' '}
              <span className="font-normal text-oslo">maior que</span>{' '}
              {queries.voteCountGTE.value}
            </FilterTag>
          </li>
        )}

        {queries.voteCountLTE.has && (
          <li className={filterStyle}>
            <FilterTag
              removeFilter={removeFilter}
              searchParam={queries.voteCountLTE.searchParam}
            >
              Nº de Avaliações{' '}
              <span className="font-normal text-oslo">menor que</span>{' '}
              {queries.voteCountLTE.value}
            </FilterTag>
          </li>
        )}

        {queries.withGenres.has && (
          <li className={filterStyle}>
            <FilterTag
              removeFilter={removeFilter}
              searchParam={queries.withGenres.searchParam}
            >
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
            </FilterTag>
          </li>
        )}

        {queries.withRuntimeGTE.has && (
          <li className={filterStyle}>
            <FilterTag
              removeFilter={removeFilter}
              searchParam={queries.withRuntimeGTE.searchParam}
            >
              Duração <span className="font-normal text-oslo">maior que</span>{' '}
              {queries.withRuntimeGTE.value} minutos
            </FilterTag>
          </li>
        )}

        {queries.withRuntimeLTE.has && (
          <li className={filterStyle}>
            <FilterTag
              removeFilter={removeFilter}
              searchParam={queries.withRuntimeLTE.searchParam}
            >
              Duração <span className="font-normal text-oslo">menor que</span>{' '}
              {queries.withRuntimeLTE.value} minutos
            </FilterTag>
          </li>
        )}
      </ul>
    </div>
  )
}
