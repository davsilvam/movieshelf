import { ElementType, ReactNode } from 'react'

interface MovieContainerTitleProps {
  children: ReactNode
  icon: ElementType
}

export function MovieContainerTitle({
  children,
  icon: Icon,
}: MovieContainerTitleProps) {
  return (
    <header className="text-white">
      <div className="flex items-center gap-2">
        <Icon className="h-6 w-6" />
        <p className="text-2xl font-semibold">{children}</p>
      </div>
    </header>
  )
}
