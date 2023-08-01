import Link from 'next/link'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  ReactNode,
} from 'react'

import { cn } from 'utils'

const defaultStyles = 'transition rounded-lg'

const sizes = {
  base: 'px-6 py-3 w-fit',
  full: 'px-6 py-3 w-full',
}

const variants = {
  primary: cn(
    'flex items-center justify-center gap-3',
    'text-woodsmoke font-semibold duration-150',
    'bg-white',
    'hover:bg-white/70 transition',
  ),
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
