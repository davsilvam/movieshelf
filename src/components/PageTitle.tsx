import Link from 'next/link'
import { ReactNode } from 'react'

import { ArrowLeft } from 'lucide-react'

interface PageTitleProps {
  children: ReactNode
}

export function PageTitle({ children }: PageTitleProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-oslo transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3 w-3" />
        Página Inicial
      </Link>

      <h1 className="font-alt text-7xl uppercase text-white">{children}</h1>
    </div>
  )
}
