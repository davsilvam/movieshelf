import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const ActionButton: FC<ActionButtonProps> = ({
  className,
  children,
  ...rest
}) => (
  <button
    children={children}
    className={`group flex h-12 w-12 items-center justify-center gap-2 rounded-md font-bold shadow-md transition-colors duration-300 ${className}`}
    {...rest}
  />
)
