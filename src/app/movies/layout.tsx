import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-0 min-h-screen bg-woodsmoke pb-10">
      {children}
    </div>
  )
}
