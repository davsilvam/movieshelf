import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const BaseButton: FC<BaseButtonProps> = ({
  className,
  children,
  ...rest
}) => (
  <button
    children={children}
    className={`flex h-12 w-fit items-center justify-center gap-1 rounded-md py-3 px-6 shadow-md hover:saturate-200 ${className}`}
    {...rest}
  />
)