import { ReactNode } from 'react'

import { Header, MenuBar } from 'components'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-woodsmoke">
      <Header />
      {children}
      <MenuBar />
    </div>
  )
}
