import { FC, ReactNode } from 'react'

// icons
import { X } from '@phosphor-icons/react'

// primitives
import {
  Anchor,
  Arrow,
  Close,
  Content,
  Portal,
  Root,
  Trigger
} from '@radix-ui/react-popover'

interface ReviewPopoverProps {
  children: ReactNode
  review?: string
}

export const ReviewPopover: FC<ReviewPopoverProps> = ({ children, review }) => (
  <Root>
    <Trigger asChild>{children}</Trigger>
    <Anchor />
    <Portal>
      <Content
        className="z-20 w-[50vw] max-w-[300px] rounded-sm bg-secondary-700 px-5 py-4 shadow-lg"
        side="right"
      >
        <div className="flex flex-col gap-2">
          <header className="flex items-center justify-between">
            <h3 className="text-secondary-50">Sua resenha</h3>

            <Close className="p-2" aria-label="Close">
              <X size={20} className="text-secondary-100" />
            </Close>
          </header>
          <div className="w-full rounded-sm bg-secondary-800 p-2 text-sm text-secondary-50 shadow-md">
            {review}
          </div>
        </div>
        <Arrow className="fill-secondary-700" />
      </Content>
    </Portal>
  </Root>
)
