import { Fragment, ReactNode } from 'react'

import { X } from 'lucide-react'

interface FilterTagProps {
  children: ReactNode
  searchParam: string
  removeFilter: (searchParam: string) => void
  hasDeleteAction?: boolean
}

export function FilterTag({
  children,
  searchParam,
  removeFilter,
  hasDeleteAction = true,
}: FilterTagProps) {
  return (
    <Fragment>
      <p>{children}</p>

      {hasDeleteAction && (
        <button onClick={() => removeFilter(searchParam)}>
          <X className="h-3 w-3" />
        </button>
      )}
    </Fragment>
  )
}
