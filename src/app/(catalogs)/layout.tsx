import { ReactNode } from 'react'

import { Header } from 'components'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-woodsmoke">
      <Header />
      {children}
    </div>
  )
}
