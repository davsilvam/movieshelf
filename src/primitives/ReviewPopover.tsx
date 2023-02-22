import { FC } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ReviewPopoverProps {
  children: React.ReactNode
  review?: string
}

export const ReviewPopover: FC<ReviewPopoverProps> = ({ children, review }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content
          className="z-20 w-[50vw] max-w-[300px] rounded-sm bg-secondary-700 px-5 py-4 shadow-lg"
          side="right"
        >
          <div className="flex flex-col gap-2">
            <header className="flex items-center justify-between">
              <h3 className="text-secondary-50">Sua resenha</h3>
              <Popover.Close className="p-2" aria-label="Close">
                <XMarkIcon className="w-5 text-secondary-100" />
              </Popover.Close>
            </header>
            <div className="w-full rounded-sm bg-secondary-800 p-2 text-sm text-secondary-50 shadow-md">
              {review}
            </div>
          </div>
          <Popover.Arrow className="fill-secondary-700" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
