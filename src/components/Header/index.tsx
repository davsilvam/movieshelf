import { Film } from 'lucide-react'
import Link from 'next/link'
import { Navigation } from './Navigation'
import { Profile } from './Profile'
import { Search } from './Search'

export function Header() {
  return (
    <header className="fixed top-0 z-10 flex w-full transform items-center justify-between border border-bunker-950/20 bg-bunker-950/50 px-10 py-6 backdrop-blur-[3px] transition-colors duration-300 hover:bg-bunker-950">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Film className="h-6 w-6 text-bunker-50" />
        </Link>

        <Navigation />
      </div>

      <div className="flex items-center gap-6">
        <Search />

        <Profile />
      </div>
    </header>
  )
}
