import { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
}

export function Tag({ children }: TagProps) {
  return (
    <span className="rounded bg-bunker-800/70 px-3 py-1.5 text-sm font-medium text-bunker-100">
      {children}
    </span>
  )
}
