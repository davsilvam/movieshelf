import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { queryClient } from 'services'

import { fetchWrapper } from 'functions'

import { MovieQuery } from 'types'

export function useDiscoverMovies() {
  const searchParams = useSearchParams().toString()

  const [currentPage, setCurrentPage] = useState<number>(1)

  const discoverMovies = useQuery(
    ['movies', 'discover', searchParams, 'query', currentPage],
    getDiscoverMoviesByQuery,
  )

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['discover'],
    })

    setCurrentPage(1)
  }, [searchParams])

  async function getDiscoverMoviesByQuery() {
    const data = await fetchWrapper<MovieQuery>(
      `discover/movie?language=pt-BR&${searchParams}&page=${currentPage}`,
    )

    return data
  }

  function goToNextPage() {
    setCurrentPage(state => state + 1)
  }

  function goToPreviousPage() {
    setCurrentPage(state => state - 1)
  }

  function goToPage(page: number) {
    setCurrentPage(page)
  }

  return {
    discoverMovies,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  }
}
