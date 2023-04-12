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
    className={`flex w-fit items-center gap-2 rounded-md py-3 px-6 font-semibold shadow-md hover:saturate-200 ${className}`}
    {...rest}
  />
)
