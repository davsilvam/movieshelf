import { Fragment, ReactNode } from 'react'

import { X } from 'lucide-react'

interface FilterTagProps {
  children: ReactNode
  searchParam: string
  removeFilter: (searchParam: string) => void
}

export function FilterTag({
  children,
  searchParam,
  removeFilter,
}: FilterTagProps) {
  return (
    <Fragment>
      <p>{children}</p>

      <button onClick={() => removeFilter(searchParam)}>
        <X className="h-3 w-3" />
      </button>
    </Fragment>
  )
}
