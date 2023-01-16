import React, { useState } from 'react'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export const SearchInput: React.FC = () => {
  const [search, setSearch] = useState('')

  return (
    <div className="flex items-center gap-3 rounded-lg border border-cadet py-2 px-4 text-sm text-lightest">
      <MagnifyingGlassIcon
        className={`w-4 ${search.length === 0 && 'text-cadet'}`}
      />
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        type="text"
        className="bg-transparent placeholder:text-cadet"
        placeholder="Pesquise aqui"
      />
    </div>
  )
}
