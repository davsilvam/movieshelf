import { ChevronDown } from 'lucide-react'

export function Profile() {
  return (
    <div className="flex items-center gap-3 rounded-md px-3 py-2 text-bunker-50 hover:bg-bunker-900/50">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pizazz font-semibold">
        V
      </div>

      <p className="ml-1 text-sm font-medium">Visitante</p>

      <ChevronDown className="h-4 w-4" strokeWidth={3} />
    </div>
  )
}
