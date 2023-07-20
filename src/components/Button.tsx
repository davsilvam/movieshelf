import Link from 'next/link'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  ReactNode,
} from 'react'

import { cn } from 'utils'

const defaultStyles = 'transition rounded'

const sizes = {
  base: 'px-8 py-3 w-fit',
  full: 'px-8 py-3 w-full',
}

const variants = {
  primary:
    'flex items-center gap-1 ' +
    'text-woodsmoke font-semibold duration-150 ' +
    'bg-white rounded-2xl ring ring-transparent ' +
    'hover:bg-transparent hover:ring-white hover:text-white',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ElementType
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
}

export function Button({
  children,
  icon: Icon,
  variant = 'primary',
  size = 'base',
  className,
  ...props
}: ButtonProps) {
  const sizeClass = sizes[size]
  const variantClass = variants[variant]

  return (
    <button
      {...props}
      className={cn(defaultStyles, sizeClass, variantClass, className)}
    >
      {children}
      {Icon && <Icon className="h-4 w-4" />}
    </button>
  )
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  href: string
  icon?: ElementType
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
}

export function LinkButton({
  children,
  href = '/',
  icon: Icon,
  variant = 'primary',
  size = 'base',
  className,
  ...props
}: LinkButtonProps) {
  const sizeClass = sizes[size]
  const variantClass = variants[variant]

  return (
    <Link
      {...props}
      className={cn(defaultStyles, sizeClass, variantClass, className)}
      href={href}
    >
      {children}
      {Icon && <Icon className="h-4 w-4" />}
    </Link>
  )
}
