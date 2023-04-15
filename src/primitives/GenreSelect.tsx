import { FC } from 'react'

// icons
import { Check, CaretDown, CaretUp } from '@phosphor-icons/react'

// hooks
import { useGenres } from '../hooks/useGenres'

// primitives
import {
  Content,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport
} from '@radix-ui/react-select'

// types
import { Genre } from '../@types/tmdb'

interface SelectPrimitiveProps {
  getGenreMovies: (value: string) => void
}

export const GenreSelect: FC<SelectPrimitiveProps> = ({ getGenreMovies }) => {
  const { data: genres } = useGenres()

  return (
    <Root onValueChange={value => getGenreMovies(value)}>
      <Trigger
        aria-label="genres"
        className="flex w-40 items-center justify-between gap-2 rounded bg-secondary-700 px-3 py-2 text-sm text-secondary-50 shadow-lg outline-none"
      >
        <Value placeholder="Gêneros" />
        <Icon>
          <CaretDown size={16} />
        </Icon>
      </Trigger>

      <Portal>
        <Content className="mt-2 h-48" position="popper">
          <ScrollUpButton className="flex w-full items-center justify-center">
            <CaretUp size={16} className="text-secondary-50" />
          </ScrollUpButton>

          <Viewport className="flex  w-40 flex-col overflow-hidden rounded-lg bg-secondary-700 py-2 text-sm text-secondary-50 shadow-lg outline-none">
            {genres?.map(genre => (
              <SelectItem genre={genre} key={genre.id} />
            ))}
          </Viewport>

          <ScrollDownButton className="flex w-full items-center justify-center">
            <CaretDown size={16} className="text-secondary-50" />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>
  )
}

const SelectItem: FC<{ genre: Genre }> = ({ genre }) => (
  <Item
    value={String(genre.id)}
    className="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 outline-none transition-colors hover:bg-slate-700"
  >
    <ItemText>{genre.name}</ItemText>
    <ItemIndicator>
      <Check size={16} />
    </ItemIndicator>
  </Item>
)
