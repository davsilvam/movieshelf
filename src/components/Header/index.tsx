import React from 'react'
import { SearchInput } from '../SearchInput'

export const Header: React.FC = () => {
  return (
    <header className="flex w-full items-center justify-between px-8 py-10">
      <SearchInput />
    </header>
  )
}
