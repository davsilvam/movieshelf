import { FC } from 'react'

// primitives
import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  Trigger
} from '@radix-ui/react-tooltip'

interface TooltipMessageProps {
  children: React.ReactNode
  message: string
}

export const TooltipMessage: FC<TooltipMessageProps> = ({
  children,
  message
}) => (
  <Provider>
    <Root>
      <Trigger asChild>{children}</Trigger>
      <Portal>
        <Content
          className="z-20 rounded-md bg-secondary-700 py-2 px-3 text-sm text-secondary-50"
          sideOffset={5}
        >
          {message}
          <Arrow className="fill-secondary-700" />
        </Content>
      </Portal>
    </Root>
  </Provider>
)
