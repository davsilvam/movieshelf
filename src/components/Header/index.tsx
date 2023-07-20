import { ChevronDown, Film } from 'lucide-react'
import Link from 'next/link'
import { cn } from 'utils/cn'
import { Navigation } from './Navigation'
import { Profile } from './Profile'
import { SearchBar } from './SearchBar'

export function Header() {
  return (
    <header
      className={cn(
        'fixed top-0 z-20',
        'flex flex-col items-center gap-5',
        'w-full -translate-y-20 px-10 py-6',
        'group transition-all duration-300 hover:translate-y-0 hover:bg-woodsmoke',
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Film className="h-6 w-6 text-white" />
          </Link>

          <Navigation />
        </div>

        <div className="flex items-center gap-6 text-white">
          <SearchBar />

          <Profile />
        </div>
      </div>

      <div className="flex items-center justify-center text-white">
        <ChevronDown className="h-7 w-7 transition-all duration-300 group-hover:rotate-180" />
      </div>
    </header>
  )
}
