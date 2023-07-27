import { useRouter, useSearchParams } from 'next/navigation'
import { useState, FormEvent } from 'react'

export function useFilters() {
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const [step, setStep] = useState<number>(0)
  const [filterCategory, setFilterCategory] = useState<number>(0)
  const [filter, setFilter] = useState<string>('')

  const filters = [
    {
      title: 'Lançamento',
      options: [
        {
          description: 'Lançados depois de',
          query: 'release_date.gte',
        },
        {
          description: 'Lançados antes de',
          query: 'release_date.lte',
        },
      ],
      placeholder: '2004',
    },
    {
      title: 'Avaliação',
      options: [
        {
          description: 'Avaliação maior que',
          query: 'vote_average.gte',
        },
        {
          description: 'Avaliação menor que',
          query: 'vote_average.lte',
        },
      ],
      placeholder: '9.6',
    },
    {
      title: 'Avaliações',
      options: [
        {
          description: 'Nº de Avaliações maior que',
          query: 'vote_count.gte',
        },
        {
          description: 'Nº de Avaliações menor que',
          query: 'vote_count.lte',
        },
      ],
      placeholder: '2000',
    },
    {
      title: 'Duração (em minutos)',
      options: [
        {
          description: 'Duração maior que',
          query: 'with_runtime.gte',
        },
        {
          description: 'Duração menor que',
          query: 'with_runtime.lte',
        },
      ],
      placeholder: '120',
    },
  ]

  function resetMenu() {
    setStep(0)
    setFilterCategory(0)
  }

  function goToNextStep() {
    setStep((state) => state + 1)
  }

  function goToPreviousStep() {
    setStep((state) => state - 1)
  }

  function selectFilterCategory(filter: number) {
    const defaultQuery = filters[filter].options[0].query

    setFilterCategory(filter)
    setFilter(defaultQuery)

    goToNextStep()
  }

  function handleFilter(selectedFilter: string) {
    setFilter(selectedFilter)
  }

  function submitFilter(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)

    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (searchParams.has(filter)) {
      current.delete(filter)
    }

    const search = current
      ? `?${current}&${filter}=${formData.get('param')}`
      : `?${filter}=${formData.get('param')}`

    push(`/discover${search}`)
  }

  return {
    step,
    filterCategory,
    filters,
    resetMenu,
    goToPreviousStep,
    goToNextStep,
    selectFilterCategory,
    handleFilter,
    submitFilter,
  }
}
