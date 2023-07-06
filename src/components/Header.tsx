import { Navigation, SearchBar } from 'components'

export function Header() {
  return (
    <header
      className="absolute left-1/2 top-6 z-10 flex -translate-x-1/2 transform items-center justify-between rounded-lg bg-bunker-900/30 px-10 py-5"
      style={{
        width: 'calc(100% - 80px)',
      }}
    >
      <strong className="w-60 font-alt text-3xl font-semibold text-bunker-50">
        Movieshelf
      </strong>

      <Navigation />
      <SearchBar />
    </header>
  )
}
