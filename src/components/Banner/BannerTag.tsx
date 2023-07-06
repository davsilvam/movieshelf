import { ReactNode } from 'react'

interface BannerTagProps {
  children: ReactNode
}

export function BannerTag({ children }: BannerTagProps) {
  return (
    <span className="rounded bg-bunker-800/70 px-3 py-1.5 text-sm font-medium text-bunker-100">
      {children}
    </span>
  )
}
