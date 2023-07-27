'use client'

import { Fragment } from 'react'

import {
  Content,
  Group,
  Item,
  Label,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dropdown-menu'
import {
  CalendarClock,
  ChevronLeft,
  Clock,
  Filter,
  Star,
  Users,
} from 'lucide-react'

import { Button } from 'components'

import { useFilters } from './hooks'
import { cn } from 'utils'

import { FilterSelect } from './FilterSelect'

export function FiltersDropdown() {
  const {
    filterCategory,
    filters,
    goToPreviousStep,
    handleFilter,
    resetMenu,
    selectFilterCategory,
    step,
    submitFilter,
  } = useFilters()

  const filterSelectorStyle = cn(
    'flex flex-col items-center justify-center gap-1',
    'aspect-square w-full rounded p-3 outline-none',
    'transition hover:bg-white/10 hover:text-white',
  )

  return (
    <Root onOpenChange={resetMenu}>
      <Trigger asChild>
        <button className="flex items-center gap-2 rounded p-2 text-white outline-none hover:bg-shark">
          <Filter className="h-4 w-4" /> Filtro
        </button>
      </Trigger>

      <Portal>
        <Content
          className="flex min-w-[280px] flex-col gap-3 rounded bg-shark p-5 text-white"
          sideOffset={5}
          align="end"
        >
          {step === 0 && (
            <Fragment>
              <Label className="font-semibold">Adicionar filtro</Label>

              <Group className="grid grid-cols-2 gap-2 rounded-md text-sm text-oslo">
                <Item
                  onClick={(event) => {
                    event.preventDefault()
                    selectFilterCategory(0)
                  }}
                  asChild
                >
                  <button className={filterSelectorStyle}>
                    <CalendarClock className="h-5 w-5" /> Lançamento
                  </button>
                </Item>

                <Item
                  onClick={(event) => {
                    event.preventDefault()
                    selectFilterCategory(1)
                  }}
                  asChild
                >
                  <button className={filterSelectorStyle}>
                    <Star className="h-5 w-5" />
                    Avaliação
                  </button>
                </Item>

                <Item
                  onClick={(event) => {
                    event.preventDefault()
                    selectFilterCategory(2)
                  }}
                  asChild
                >
                  <button className={filterSelectorStyle}>
                    <Users className="h-5 w-5" />
                    Avaliações
                  </button>
                </Item>

                <Item
                  onClick={(event) => {
                    event.preventDefault()
                    selectFilterCategory(3)
                  }}
                  asChild
                >
                  <button className={filterSelectorStyle}>
                    <Clock className="h-5 w-5" />
                    Duração
                  </button>
                </Item>
              </Group>
            </Fragment>
          )}

          {step === 1 && (
            <Fragment>
              <Label className="flex items-center gap-3 font-semibold">
                <button
                  onClick={goToPreviousStep}
                  className="rounded p-1 transition-colors hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {filters[filterCategory].title}
              </Label>

              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  submitFilter(event)
                }}
                className="flex flex-col gap-3"
              >
                <div className="flex w-full flex-col gap-1">
                  <label className="text-sm text-white/70">Filtro</label>

                  <FilterSelect
                    options={filters[filterCategory].options}
                    setFilter={handleFilter}
                  />
                </div>

                <div className="mb-5 flex w-full flex-col gap-1">
                  <label htmlFor="param" className="text-sm text-white/70">
                    Parâmetro
                  </label>

                  <input
                    className="w-full rounded bg-white/5 p-2 text-sm text-white outline-none transition-colors hover:bg-white/10 focus:bg-white/10"
                    id="param"
                    name="param"
                    placeholder={filters[filterCategory].placeholder}
                  />
                </div>

                <Button className="text-sm" size="full">
                  Adicionar filtro
                </Button>
              </form>
            </Fragment>
          )}
        </Content>
      </Portal>
    </Root>
  )
}
