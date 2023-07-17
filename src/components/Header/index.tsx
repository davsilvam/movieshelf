import { Film } from 'lucide-react'
import Link from 'next/link'
import { cn } from 'utils/cn'
import { Navigation } from './Navigation'
import { Profile } from './Profile'
import { Search } from './Search'

export function Header() {
  return (
    <header
      className={cn(
        'fixed top-0 z-10',
        'flex items-center justify-between',
        'w-full border border-woodsmoke/20 px-10 py-6',
        'bg-woodsmoke/50 backdrop-blur-[3px]',
        'transition-colors duration-300 hover:bg-woodsmoke',
      )}
    >
      <div className="flex items-center gap-10">
        <Link href="/">
          <Film className="h-6 w-6 text-white" />
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
