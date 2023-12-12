'use client'

import {
  CheckboxItem,
  Content,
  ItemIndicator,
  Group,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dropdown-menu'
import { AtSign, Check } from 'lucide-react'

import { useGenresSelector } from './hooks'
import { cn, movieGenres, movieGenresIds } from 'utils'

export function GenresDropdown() {
  const { checkedGenres, handleGenres, submitGenres } = useGenresSelector()

  const genreCheckboxStyle = cn(
    'cursor-pointer',
    'flex items-center justify-center gap-2',
    'w-full rounded p-2 outline-none',
    'max-md:text-sm',
    'transition hover:bg-white/10 hover:text-white',
  )

  return (
    <Root onOpenChange={submitGenres}>
      <Trigger asChild>
        <button className="flex items-center gap-2 rounded p-2 text-white outline-none hover:bg-shark">
          <AtSign className="h-4 w-4" /> Gêneros
        </button>
      </Trigger>

      <Portal>
        <Content
          className="flex flex-col gap-3 rounded bg-shark p-3 text-white max-md:ml-6 md:min-w-[300px]"
          sideOffset={5}
          align="center"
        >
          <Group className="grid grid-cols-2 gap-2 rounded-md text-sm">
            {movieGenresIds.map(genreId => (
              <CheckboxItem
                onClick={event => {
                  event.preventDefault()
                  handleGenres(genreId)
                }}
                className={cn(
                  genreCheckboxStyle,
                  checkedGenres.some(genre => genre === genreId)
                    ? 'text-white'
                    : 'text-oslo',
                )}
                checked={checkedGenres.some(genre => genre === genreId)}
                key={genreId}
              >
                <ItemIndicator>
                  <Check className="h-4 w-4" />
                </ItemIndicator>
                {movieGenres[genreId]}
              </CheckboxItem>
            ))}
          </Group>
        </Content>
      </Portal>
    </Root>
  )
}
