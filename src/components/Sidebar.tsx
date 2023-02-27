import { FC } from 'react'

// Contexts
import { useShelf } from '../contexts/ShelfContext'

// Icons
import {
  BookmarkIcon,
  HeartIcon,
  HomeIcon,
  Square3Stack3DIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline'

// Router
import { Link } from 'react-router-dom'

export const Sidebar: FC = () => {
  const { favorites } = useShelf()

  return (
    <aside
      className="fixed left-0 z-10 flex h-screen w-[20%] flex-shrink-0
     flex-col gap-8 border-r border-r-secondary-500 bg-secondary-800 py-10 px-6 max-lg:hidden xl:w-[16%]"
    >
      <div className="flex w-full items-center gap-3 xl:pl-2">
        <img src="/logo.png" alt="" className="w-6" />
        <h2 className="text-xl">Movieshelf</h2>
      </div>

      <div className="flex flex-col">
        <h3 className="mb-4 text-xs uppercase text-cadet">Navegue</h3>
        <ul className="flex flex-col gap-2">
          <li>
            <Link to="/" className="sidebar-link">
              <HomeIcon className="w-5" /> Início
            </Link>
          </li>
          <li>
            <Link to="/genres" className="sidebar-link">
              <Square3Stack3DIcon className="w-5" /> Gêneros
            </Link>
          </li>
        </ul>
      </div>

      <hr className="border-secondary-500" />

      <div className="flex flex-col">
        <h3 className="mb-4 text-xs uppercase text-cadet">Biblioteca</h3>
        <ul className="flex flex-col gap-2">
          <li>
            <Link to="/shelf" className="sidebar-link group">
              <Squares2X2Icon className="w-5" /> Estante{' '}
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="sidebar-link group">
              <HeartIcon className="w-5" /> Favoritos{' '}
              <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-carnation text-sm group-hover:bg-secondary-900 group-hover:text-pizazz">
                {favorites.length}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/saved" className="sidebar-link">
              <BookmarkIcon className="w-5" /> Salvos
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
