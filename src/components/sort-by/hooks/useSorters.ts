import { useRouter, useSearchParams } from 'next/navigation'

export function useSorters() {
  const { push } = useRouter()
  const searchParams = useSearchParams()

  const sorters = [
    {
      name: 'Popularidade: Desc',
      value: 'popularity.desc',
    },
    {
      name: 'Popularidade: Asc',
      value: 'popularity.asc',
    },
    {
      name: 'Receita: Desc',
      value: 'revenue.desc',
    },
    {
      name: 'Receita: Asc',
      value: 'revenue.asc',
    },
    {
      name: 'Lançamento: Desc',
      value: 'primary_release_date.desc',
    },
    {
      name: 'Lançamento: Asc',
      value: 'primary_release_date.asc',
    },
    {
      name: 'Avaliação: Desc',
      value: 'vote_average.desc',
    },
    {
      name: 'Avaliação: Asc',
      value: 'vote_average.asc',
    },
    {
      name: 'Avaliações: Desc',
      value: 'vote_count.desc',
    },
    {
      name: 'Avaliações: Asc',
      value: 'vote_count.asc',
    },
  ]

  function submitSorter(sorter: string) {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (searchParams.has('sort_by')) {
      current.delete('sort_by')
    }

    const search = current
      ? `?${current}&sort_by=${sorter}`
      : `?sort_by=${sorter}`

    push(`/discover${search}`)
  }

  function getSorterMessage(param: string) {
    const sorter = sorters.find(sorter => sorter.value === param)
    return sorter?.name ?? ''
  }

  return {
    sorters,
    submitSorter,
    getSorterMessage,
  }
}
