import { Search as SearchIcon } from 'lucide-react'

export function Search() {
  return (
    <button className="rounded-full p-2 hover:bg-bunker-900/50">
      <SearchIcon className="h-6 w-6 text-bunker-50" />
    </button>
  )
}
