'use client'

import {
  Content,
  Group,
  Icon,
  Item,
  ItemText,
  Portal,
  Root,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

type Option = {
  description: string
  query: string
}

interface FilterSelectProps {
  options: Option[]
  setFilter: (selectedFilter: string) => void
}

export function FilterSelect({ options, setFilter }: FilterSelectProps) {
  return (
    <Root onValueChange={value => setFilter(value)}>
      <Trigger className="flex w-full items-center justify-between rounded bg-white/5 p-2 text-sm text-white outline-none transition-colors hover:bg-white/10">
        <Value
          defaultValue={options[0].description}
          placeholder={options[0].description}
        />

        <Icon>
          <ChevronDown className="h-4 w-4" />
        </Icon>
      </Trigger>

      <Portal>
        <Content
          className="flex rounded bg-woodsmoke p-2"
          position="popper"
          sideOffset={6}
        >
          <Viewport>
            <Group className="flex flex-col items-center gap-1">
              {options.map(option => (
                <Item
                  className="w-full cursor-pointer rounded p-2 text-sm text-oslo outline-none transition-colors hover:bg-white/10 hover:text-white"
                  value={option.query}
                  key={option.description}
                >
                  <ItemText>{option.description}</ItemText>
                </Item>
              ))}
            </Group>
          </Viewport>
        </Content>
      </Portal>
    </Root>
  )
}
