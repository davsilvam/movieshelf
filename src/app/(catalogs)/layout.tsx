import { ReactNode } from 'react'

import { Header, MenuBar } from 'components'

export default function CatalogsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-woodsmoke">
      <Header />
      {children}
      <MenuBar />
    </div>
  )
}
