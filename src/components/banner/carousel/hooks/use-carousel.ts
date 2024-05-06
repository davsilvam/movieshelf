import { useContext } from 'react'

import { CarouselContext } from '../context'

export function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <BannerCarousel />')
  }

  return context
}
