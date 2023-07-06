import { Navigation, SearchBar } from 'components'
import { Clapperboard } from 'lucide-react'

export function Header() {
  return (
    <header
      className="absolute left-1/2 top-6 z-10 flex -translate-x-1/2 transform items-center justify-between rounded-lg bg-bunker-900/30 px-10 py-5"
      style={{
        width: 'calc(100% - 80px)',
      }}
    >
      <strong className="flex w-60 items-center gap-2 font-alt text-3xl font-semibold text-bunker-50">
        <Clapperboard className="mb-1 h-6 w-6" />
        Movieshelf
      </strong>

      <Navigation />
      <SearchBar />
    </header>
  )
}
