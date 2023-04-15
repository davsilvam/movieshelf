import { FC } from 'react'

// components
import { SearchInput } from './'

export const Header: FC = () => (
  <header className="absolute left-4 top-6 z-10 md:left-8 md:top-6">
    <SearchInput />
  </header>
)
