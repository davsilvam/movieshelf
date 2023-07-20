'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { KeyboardEvent } from 'react'

export function SearchBar() {
  const { push } = useRouter()

  function handleSearch(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      push(`/search?query=${event.currentTarget.value}`)
    }
  }

  return (
    <button className="flex items-center rounded-2xl bg-white/10 px-3">
      <Search className="h-5 w-5 text-white" />
      <input
        onKeyDown={(event) => handleSearch(event)}
        className="min-w-[240px] bg-transparent px-3 py-2 outline-none placeholder:text-white/50"
        type="text"
        placeholder="O que quer ver hoje?"
      />
    </button>
  )
}
