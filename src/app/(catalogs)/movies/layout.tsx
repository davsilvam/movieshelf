import { ReactNode } from 'react'

export default function MoviesLayout({ children }: { children: ReactNode }) {
  return <div className="relative z-0 pb-10">{children}</div>
}
