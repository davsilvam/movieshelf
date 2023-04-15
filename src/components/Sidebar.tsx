import { FC } from 'react'

// icons
import {
  Bookmarks,
  Heart,
  House,
  SquaresFour,
  Stack
} from '@phosphor-icons/react'

// router
import { Link } from 'react-router-dom'

export const Sidebar: FC = () => (
  <aside className="fixed left-0 z-10 h-screen w-60 border-r border-r-secondary-500 bg-secondary-800 py-10 px-6 max-lg:hidden xl:w-[16%]">
    <div className="mb-8 flex w-full items-center gap-3 xl:pl-2">
      <img src="/logo.png" alt="" className="w-6" />
      <strong className="font-lato text-xl">Movieshelf</strong>
    </div>

    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h3 className="mb-4 text-xs uppercase text-cadet">Navegue</h3>
        <nav className="space-y-2">
          <Link to="/" className="sidebar-link">
            <House size={20} /> <span>Início</span>
          </Link>
          <Link to="/genres" className="sidebar-link">
            <Stack size={20} /> <span>Gêneros</span>
          </Link>
        </nav>
      </div>

      <hr className="border-secondary-500" />

      <div className="flex flex-col">
        <h3 className="mb-4 text-xs uppercase text-cadet">Biblioteca</h3>
        <nav className="space-y-2">
          <Link to="/shelf" className="sidebar-link group">
            <SquaresFour size={20} /> <span>Estante</span>
          </Link>
          <Link to="/favorites" className="sidebar-link group">
            <Heart size={20} /> <span>Favoritos</span>
          </Link>
          <Link to="/saved" className="sidebar-link">
            <Bookmarks size={20} /> <span>Salvos</span>
          </Link>
        </nav>
      </div>
    </div>
  </aside>
)
