import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="flex w-60 items-center gap-3 rounded-xl border border-bunker-50 px-4 py-2 text-bunker-50">
      <Search className="h-4 w-4" />
      <input
        className="bg-transparent text-sm outline-none placeholder:text-bunker-100"
        type="text"
        placeholder="Pesquise aqui"
      />
    </div>
  )
}
