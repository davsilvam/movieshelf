import { FC, useCallback, useState } from 'react'

// Icons
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

// Router
import { useNavigate } from 'react-router-dom'

export const SearchInput: FC = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchStatus, setSearchStatus] = useState<boolean>(false)

  function toogleSearch() {
    setSearchStatus(state => !state)
  }

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
    <div
      onClick={toogleSearch}
      className="bg-secondary-900 text-secondary-50 flex h-10 cursor-pointer items-center gap-3 rounded-lg border border-cadet py-2 px-4 text-sm"
    >
      <MagnifyingGlassIcon
        className={`w-4 ${search.length === 0 && 'text-cadet'}`}
      />
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={searchMovies}
        type="text"
        className={`cursor-text bg-transparent placeholder:text-cadet ${
          !searchStatus && 'max-lg:hidden'
        }`}
        placeholder="Pesquise aqui"
      />
    </div>
  )
}