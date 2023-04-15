import { FC, useCallback, useState } from 'react'

// icons
import { MagnifyingGlass } from '@phosphor-icons/react'

// router
import { useNavigate } from 'react-router-dom'

export const SearchInput: FC = () => {
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
    <div className="flex h-10 items-center gap-3 rounded-lg bg-secondary-700 py-2 px-4 text-sm text-secondary-50">
      <MagnifyingGlass
        size={16}
        className={search.length === 0 ? 'text-cadet' : ''}
      />
      <input
        onChange={e => setSearch(e.target.value)}
        onKeyDown={searchMovies}
        className="cursor-text bg-transparent placeholder:text-cadet"
        placeholder="Pesquise aqui"
        type="text"
        value={search}
      />
    </div>
  )
}
