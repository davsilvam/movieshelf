'use client'

import { ReactNode, Suspense } from 'react'

import { Header, MenuBar } from 'components'

export default function CatalogsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-woodsmoke">
      <Header />
      <Suspense>{children}</Suspense>
      <MenuBar />
    </div>
  )
}
