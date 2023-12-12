'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  param: z.string().min(1, 'O campo é obrigatório.'),
})

type FormSchema = z.infer<typeof formSchema>

export function useFilters() {
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const [step, setStep] = useState<number>(0)
  const [filterCategory, setFilterCategory] = useState<number>(0)
  const [filter, setFilter] = useState<string>('')

  const {
    formState: { errors },
    handleSubmit,
    register,
    resetField,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      param: '',
    },
  })

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
    setStep(state => state + 1)
  }

  function goToPreviousStep() {
    setStep(state => state - 1)
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

  function submitFilter({ param }: FormSchema) {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (searchParams.has(filter)) {
      current.delete(filter)
    }

    const search = current
      ? `?${current}&${filter}=${param}`
      : `?${filter}=${param}`

    resetField('param')

    push(`/discover${search}`)
  }

  return {
    step,
    filterCategory,
    errors,
    handleSubmit,
    register,
    filters,
    resetMenu,
    goToPreviousStep,
    selectFilterCategory,
    handleFilter,
    submitFilter,
  }
}
