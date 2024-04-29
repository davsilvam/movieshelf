import { useRouter } from 'next/navigation'
import { KeyboardEvent } from 'react'

export function useSearchBar() {
  const { push } = useRouter()

  function handleSearch(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      push(`/search?query=${event.currentTarget.value}`)
    }
  }

  return {
    handleSearch,
  }
}
