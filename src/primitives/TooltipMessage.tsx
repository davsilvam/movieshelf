import { FC } from 'react'

// Primitives
import * as Tooltip from '@radix-ui/react-tooltip'

interface TooltipMessageProps {
  children: React.ReactNode
  message: string
}

export const TooltipMessage: FC<TooltipMessageProps> = ({
  children,
  message
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-20 rounded-md bg-secondary-700 py-2 px-3 text-sm text-secondary-50"
            sideOffset={5}
          >
            {message}
            <Tooltip.Arrow className="fill-secondary-700" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
