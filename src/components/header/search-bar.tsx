'use client'

import { Search } from 'lucide-react'

import { useSearchBar } from './hooks'
import { cn } from 'utils'

const sizes = {
  base: 'w-full max-w-[280px]',
  full: 'w-full',
}

interface SearchBarProps {
  size?: keyof typeof sizes
}

export function SearchBar({ size = 'base' }: SearchBarProps) {
  const { handleSearch } = useSearchBar()

  const sizeClass = sizes[size]

  return (
    <button
      className={cn(
        sizeClass,
        'flex items-center',
        'rounded-lg px-5',
        'text-white/50',
        'bg-white/5',
        'transition focus-within:bg-white/10 focus-within:text-white hover:bg-white/10',
      )}
    >
      <Search className="h-4 w-4" />
      <input
        onKeyDown={event => handleSearch(event)}
        className={cn(
          'w-full',
          'px-3 py-2 outline-none',
          'text-sm placeholder:text-white/30',
          'bg-transparent',
        )}
        type="text"
        placeholder="O que vai ver hoje?"
      />
    </button>
  )
}
