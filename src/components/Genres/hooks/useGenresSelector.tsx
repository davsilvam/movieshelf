import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function useGenresSelector() {
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const queryGenres = searchParams
    .get('with_genres')
    ?.split(',')
    .map(item => Number(item))

  const [checkedGenres, setCheckedGenres] = useState<number[]>(
    queryGenres || [],
  )

  function handleGenres(genreId: number) {
    if (checkedGenres.some(genre => genre === genreId)) {
      return setCheckedGenres(state => state.filter(genre => genre !== genreId))
    }

    setCheckedGenres(state => [...state, genreId])
  }

  function submitGenres(open: boolean) {
    if (open) return

    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (searchParams.has('with_genres')) {
      current.delete('with_genres')
    }

    const genresParam = checkedGenres.join(',')

    const search = current
      ? `?${current}&with_genres=${genresParam}`
      : `?with_genres=${genresParam}`

    push(`/discover${search}`)
  }

  return {
    checkedGenres,
    handleGenres,
    submitGenres,
  }
}
