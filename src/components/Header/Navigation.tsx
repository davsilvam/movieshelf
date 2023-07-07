import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="flex items-center gap-6 font-semibold text-bunker-50">
      <Link className="rounded-md px-3 py-2 hover:bg-bunker-900/50" href="/">
        Página Inicial
      </Link>

      <button className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-bunker-900/50">
        Categorias <ChevronDown className="h-4 w-4" strokeWidth={3} />
      </button>

      <button className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-bunker-900/50">
        Gêneros <ChevronDown className="h-4 w-4" strokeWidth={3} />
      </button>
    </nav>
  )
}
