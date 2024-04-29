import { HTMLAttributes, forwardRef } from 'react'

import { useCarousel } from './hooks/use-carousel'
import { cn } from 'utils'

export const BannerCarouselItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
})

BannerCarouselItem.displayName = 'BannerCarouselItem'
