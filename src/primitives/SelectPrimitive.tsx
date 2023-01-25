import { FC } from 'react'

// Icons
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/20/solid'

// Primitives
import * as Select from '@radix-ui/react-select'

// Services
import { instance } from '../services/apiConfig'

// Types
import { GenreType } from '../@types/tmdb'

// Query
import { useQuery } from 'react-query'

interface SelectPrimitiveProps {
  getGenreMovies: (value: string) => void
}

export const SelectPrimitive: FC<SelectPrimitiveProps> = ({
  getGenreMovies
}) => {
  const { data: genres } = useQuery<GenreType[]>('genres', async () => {
    const GENRES_URL = `/genre/movie/list?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=pt-BR`

    const { data } = await instance.get(GENRES_URL)

    return data.genres
  })

  return (
    <Select.Root onValueChange={value => getGenreMovies(value)}>
      <Select.Trigger
        aria-label="genres"
        className="flex w-40 items-center justify-between gap-2 rounded bg-slate-800 px-3 py-2 text-sm text-lightest shadow-lg outline-none"
      >
        <Select.Value placeholder="Gêneros" />
        <Select.Icon>
          <ChevronDownIcon className="w-5" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="mt-2 h-48" position="popper">
          <Select.ScrollUpButton className="flex w-full items-center justify-center">
            <ChevronUpIcon className="w-5 text-lightest" />
          </Select.ScrollUpButton>
          <Select.Viewport className="flex  w-40 flex-col overflow-hidden rounded-lg bg-slate-800 py-2 text-sm text-lightest shadow-lg outline-none">
            {genres?.map(genre => (
              <Select.Item
                key={genre.id}
                value={String(genre.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 outline-none transition-colors hover:bg-slate-700"
              >
                <Select.ItemText>{genre.name}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon className="w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex w-full items-center justify-center">
            <ChevronDownIcon className="w-5 text-lightest" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
