'use client'

import Link from 'next/link'

import { SearchBar } from 'components'

import { useMenuBar } from './hooks'

export function MenuBar() {
  const { isOpen, toggleMenu } = useMenuBar()

  return (
    <div
      className="fixed bottom-0 left-0 z-30 flex w-full flex-col rounded-t-lg bg-shark transition lg:hidden"
      style={{
        transform: `translateY(${isOpen ? '0px' : 'calc(100% - 52px)'})`,
      }}
    >
      <button
        onClick={toggleMenu}
        className="flex w-full items-center justify-center overflow-hidden border-b border-white/10 py-6 transition hover:bg-white/5"
      >
        <div className="h-1.5 w-20 rounded-md bg-white" />
      </button>

      <div className="flex flex-col gap-5 p-6">
        <SearchBar size="full" />

        <nav className="flex w-full flex-col gap-1 text-white">
          <Link
            href="/"
            className="rounded-md px-4 py-3 transition hover:bg-white/5"
          >
            Página Inicial
          </Link>

          <Link
            href="/discover"
            className="rounded-md px-4 py-3 transition hover:bg-white/5"
          >
            Descubra
          </Link>

          <Link
            href="/movie/popular"
            className="rounded-md px-4 py-3 transition hover:bg-white/5"
          >
            Populares
          </Link>

          <Link
            href="/movie/now-playing"
            className="rounded-md px-4 py-3 transition hover:bg-white/5"
          >
            Novidades
          </Link>

          <Link
            href="/movie/top-rated"
            className="rounded-md px-4 py-3 transition hover:bg-white/5"
          >
            Melhor Avaliados
          </Link>
        </nav>
      </div>
    </div>
  )
}
