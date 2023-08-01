import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="py-32 pt-40">{children}</div>
}
