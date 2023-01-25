import { FC } from 'react'

// Components
import { SearchInput } from './SearchInput'

export const Header: FC = () => {
  return (
    <header className="absolute left-0 top-0 z-10 flex w-full items-center justify-between px-8 py-6">
      <SearchInput />
    </header>
  )
}
