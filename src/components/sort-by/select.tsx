'use client'

import {
  Content,
  Group,
  Item,
  ItemText,
  Portal,
  Root,
  Trigger,
  Viewport,
} from '@radix-ui/react-select'
import { ArrowDownNarrowWide } from 'lucide-react'

import { useSorters } from './hooks'

export function SortBySelect() {
  const { sorters, submitSorter } = useSorters()

  return (
    <Root onValueChange={submitSorter}>
      <Trigger className="flex items-center gap-2 rounded p-2 text-white outline-none hover:bg-shark">
        <ArrowDownNarrowWide className="h-4 w-4" />
        <p>Ordenar por</p>
      </Trigger>

      <Portal>
        <Content
          className="flex w-full min-w-[180px] flex-col gap-3 rounded bg-shark p-2 text-white"
          align="end"
          position="popper"
          sideOffset={5}
        >
          <Viewport>
            <Group className="flex w-full flex-col gap-1">
              {sorters.map(sort => (
                <Item
                  className="cursor-pointer rounded p-2 text-sm outline-none hover:bg-white/10"
                  key={sort.value}
                  value={sort.value}
                >
                  <ItemText>{sort.name}</ItemText>
                </Item>
              ))}
            </Group>
          </Viewport>
        </Content>
      </Portal>
    </Root>
  )
}
