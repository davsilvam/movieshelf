import { FC } from 'react'

// components
import { SearchInput } from './'

export const Header: FC = () => (
  <header className="absolute left-0 top-0 z-10 flex w-full items-center justify-between px-8 py-6">
    <SearchInput />
  </header>
)
