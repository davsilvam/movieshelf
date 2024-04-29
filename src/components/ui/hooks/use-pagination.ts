import { useState } from 'react'

export function usePagination() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  function goToNextPage() {
    setCurrentPage(page => page + 1)
  }

  function goToPreviousPage() {
    setCurrentPage(page => page - 1)
  }

  function goToPage(page: number) {
    setCurrentPage(page)
  }

  return {
    currentPage,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  }
}
