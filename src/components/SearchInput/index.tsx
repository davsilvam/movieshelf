import React, { useCallback, useState } from 'react'

// Icons
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

// Router
import { useNavigate } from 'react-router-dom'

export const SearchInput: React.FC = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const searchMovies: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      e => {
        if (e.key === 'Enter') {
          navigate(`/search/${search}`)
        }
      },
      [search]
    )

  return (
    <div className="flex items-center gap-3 rounded-lg border border-cadet py-2 px-4 text-sm text-lightest">
      <MagnifyingGlassIcon
        className={`w-4 ${search.length === 0 && 'text-cadet'}`}
      />
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={searchMovies}
        type="text"
        className="bg-transparent placeholder:text-cadet"
        placeholder="Pesquise aqui"
      />
    </div>
  )
}
