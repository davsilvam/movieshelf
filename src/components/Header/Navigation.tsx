'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { cn } from 'utils/cn'
import { movieGenres, movieGenresIds } from 'utils/movie-genres'

export function Navigation() {
  return (
    <NavigationMenu.Root className="relative flex">
      <NavigationMenu.List className="flex items-center gap-6 font-semibold text-white">
        <NavigationMenu.Item
          className="rounded-md px-4 py-3 hover:bg-shark"
          asChild
        >
          <Link href="/">Página Inicial</Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex items-center gap-3 rounded-md px-3 py-2 hover:bg-shark">
            Categorias
            <ChevronDown
              className={cn(
                'relative top-[1px]',
                'h-4 w-4',
                'transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180',
              )}
              aria-hidden
              strokeWidth={3}
            />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="absolute left-0 top-14 w-full rounded bg-shark">
            <ul className="flex flex-col gap-1 p-2 text-white">
              <Link href="/movies/popular">
                <li className="w-full rounded px-4 py-2 transition-colors hover:bg-oslo/20">
                  <strong>Populares</strong>
                  <p className="text-sm text-white/60">
                    Veja os filmes que estão na boca do povo.
                  </p>
                </li>
              </Link>

              <Link href="/movies/hottest">
                <li className="w-full rounded px-4 py-2 transition-colors hover:bg-oslo/20">
                  <strong>Novidades</strong>
                  <p className="text-sm text-white/60">
                    Confira o que tem de mais novo nas telinhas do cinema.
                  </p>
                </li>
              </Link>

              <Link href="/movies/top_rated">
                <li className="w-full rounded px-4 py-2 transition-colors hover:bg-oslo/20">
                  <strong>Melhor Avaliados</strong>
                  <p className="text-sm text-white/60">
                    Os filmes que todo mundo ama. Não tem como errar.
                  </p>
                </li>
              </Link>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex items-center gap-3 rounded-md px-3 py-2 hover:bg-shark">
            Gêneros
            <ChevronDown
              className={cn(
                'relative top-[1px]',
                'h-4 w-4',
                'transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180',
              )}
              aria-hidden
              strokeWidth={3}
            />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="absolute left-0 top-14 w-full rounded bg-shark">
            <ul className="grid grid-cols-2 gap-1 p-2 text-white">
              {movieGenresIds.map((genreId) => (
                <Link href={`/genres/${genreId}`} key={genreId}>
                  <li className="w-full rounded px-4 py-2 text-sm font-semibold transition-colors hover:bg-oslo/20">
                    <p>{movieGenres[genreId]}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  )
}
