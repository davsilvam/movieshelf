import { Navigation, SearchBar } from 'components'

export function Header() {
  return (
    <header className="absolute left-0 top-0 flex items-center justify-between px-10 py-6">
      <Navigation />
      <SearchBar />
    </header>
  )
}
