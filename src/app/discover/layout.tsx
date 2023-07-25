import { ReactNode, Suspense } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-woodsmoke pb-10">
      <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
    </div>
  )
}
