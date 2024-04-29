import { useRouter, useSearchParams } from 'next/navigation'

interface Queries {
  [query: string]: {
    has: boolean
    value: string | null
    searchParam: string
  }
}

export function useFiltersBar() {
  const { push } = useRouter()
  const searchParams = useSearchParams()

  const queries: Queries = {
    sortBy: {
      has: searchParams.has('sort_by'),
      value: searchParams.get('sort_by'),
      searchParam: 'sort_by',
    },
    releaseDateGTE: {
      has: searchParams.has('release_date.gte'),
      value: searchParams.get('release_date.gte'),
      searchParam: 'release_date.gte',
    },
    releaseDateLTE: {
      has: searchParams.has('release_date.lte'),
      value: searchParams.get('release_date.lte'),
      searchParam: 'release_date.lte',
    },
    voteAverageGTE: {
      has: searchParams.has('vote_average.gte'),
      value: searchParams.get('vote_average.gte'),
      searchParam: 'vote_average.gte',
    },
    voteAverageLTE: {
      has: searchParams.has('vote_average.lte'),
      value: searchParams.get('vote_average.lte'),
      searchParam: 'vote_average.lte',
    },
    voteCountGTE: {
      has: searchParams.has('vote_count.gte'),
      value: searchParams.get('vote_count.gte'),
      searchParam: 'vote_count.gte',
    },
    voteCountLTE: {
      has: searchParams.has('vote_count.lte'),
      value: searchParams.get('vote_count.lte'),
      searchParam: 'vote_count.lte',
    },
    withGenres: {
      has: searchParams.has('with_genres'),
      value: searchParams.get('with_genres'),
      searchParam: 'with_genres.lte',
    },
    withRuntimeGTE: {
      has: searchParams.has('with_runtime.gte'),
      value: searchParams.get('with_runtime.gte'),
      searchParam: 'with_runtime.gte',
    },
    withRuntimeLTE: {
      has: searchParams.has('with_runtime.lte'),
      value: searchParams.get('with_runtime.lte'),
      searchParam: 'with_runtime.lte',
    },
  }

  function removeFilter(searchParam: string) {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    current.delete(searchParam)

    push(`/discover?${current}`)
  }

  return {
    queries,
    removeFilter,
  }
}
