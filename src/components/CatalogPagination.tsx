import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from 'utils'

interface CatalogPaginationProps {
  currentPage: number
  totalPages: number
  goToPreviousPage: () => void
  goToNextPage: () => void
  goToPage: (page: number) => void
}

export function CatalogPagination({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  goToPage,
}: CatalogPaginationProps) {
  const pageBulletStyle = cn(
    'cursor-pointer',
    'flex items-center justify-center',
    'h-8 w-fit min-w-[32px] rounded-full px-2',
    'text-white',
    'transition',
  )

  return (
    <footer className="mt-10 flex w-full items-end justify-center gap-4 md:gap-10">
      <button
        onClick={goToPreviousPage}
        className="rounded-full bg-white p-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <ul className="flex items-center gap-3 text-xs font-medium text-white md:gap-5 md:text-sm">
        {currentPage > 1 && (
          <li
            onClick={() => goToPage(currentPage - 1)}
            className={cn(pageBulletStyle, 'hover:bg-white/10')}
          >
            {currentPage - 1}
          </li>
        )}

        <li className={cn(pageBulletStyle, 'bg-white text-woodsmoke')}>
          {currentPage}
        </li>

        {currentPage <= totalPages - 1 && (
          <li
            onClick={() => goToPage(currentPage + 1)}
            className={cn(pageBulletStyle, 'hover:bg-white/10')}
          >
            {currentPage + 1}
          </li>
        )}

        {currentPage <= totalPages - 2 && (
          <li
            onClick={() => goToPage(currentPage + 2)}
            className={cn(pageBulletStyle, 'hover:bg-white/10')}
          >
            {currentPage + 2}
          </li>
        )}

        {currentPage === 1 && currentPage < totalPages && (
          <li
            onClick={() => goToPage(currentPage + 3)}
            className={cn(pageBulletStyle, 'hover:bg-white/10')}
          >
            {currentPage + 3}
          </li>
        )}

        {currentPage < totalPages - 2 && <li>...</li>}

        {currentPage < totalPages - 10 && (
          <li
            onClick={() => goToPage(currentPage + 10)}
            className={cn(pageBulletStyle, 'hover:bg-white/10')}
          >
            {currentPage + 10}
          </li>
        )}
      </ul>

      <button
        onClick={goToNextPage}
        className="rounded-full bg-white p-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </footer>
  )
}
