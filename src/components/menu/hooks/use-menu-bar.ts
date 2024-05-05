'use client'

import { useState } from 'react'

export function useMenuBar() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    setIsOpen(state => !state)
  }

  return {
    isOpen,
    toggleMenu,
  }
}
