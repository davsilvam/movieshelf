import { ComponentProps, forwardRef } from 'react'

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

import { ButtonProps, buttonVariants } from 'components/ui/button'

import { cn } from 'utils/cn'

const Pagination = ({ className, ...props }: ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex flex-row items-center gap-5', className)}
      {...props}
    />
  ),
)

PaginationContent.displayName = 'PaginationContent'

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  ),
)
PaginationItem.displayName = 'PaginationItem'

type PaginationButtonProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  ComponentProps<'button'>

const PaginationButton = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationButtonProps) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'default' : 'ghost',
        size,
      }),
      'h-10 w-10 rounded-full',
      className,
    )}
    {...props}
  />
)

PaginationButton.displayName = 'PaginationButton'

const PaginationPrevious = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to previous page"
    size="icon"
    className={cn(
      buttonVariants({
        variant: 'default',
      }),
      'mr-5 rounded-full p-0 hover:text-woodsmoke',
      className,
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </PaginationButton>
)

PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  ...props
}: ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label="Go to next page"
    size="icon"
    className={cn(
      buttonVariants({
        variant: 'default',
      }),
      'ml-5 rounded-full p-0 hover:text-woodsmoke',
      className,
    )}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </PaginationButton>
)

PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn(
      'flex h-9 w-9 items-center justify-center text-white',
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)

PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
}
