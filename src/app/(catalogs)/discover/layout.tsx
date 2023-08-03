import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="py-16 pt-20 md:py-32 md:pt-40">{children}</div>
}
