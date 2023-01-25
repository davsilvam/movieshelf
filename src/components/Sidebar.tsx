import { FC } from 'react'

// Contexts
import { useFavorites } from '../contexts/FavoritesContext'

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
  const { favorites } = useFavorites()

  return (
    <aside className="flex w-[20%] flex-shrink-0 flex-col gap-8 border-r border-r-cadet py-10 px-6 max-lg:hidden xl:w-[16%]">
      <h2 className="mb-4">Movieshelf</h2>

      <div className="flex flex-col">
        <h3 className="mb-4 text-xs text-cadet">NAVEGUE</h3>
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

      <hr className="border-cadet opacity-50" />

      <div className="flex flex-col">
        <h3 className="mb-4 text-xs text-cadet">BIBLIOTECA</h3>
        <ul className="flex flex-col gap-2">
          <li>
            <Link to="/shelf" className="sidebar-link group">
              <Squares2X2Icon className="w-5" /> Estante{' '}
              {/* <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-main text-sm group-hover:bg-darkest group-hover:text-main">
                {favorites.length}
              </div> */}
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="sidebar-link group">
              <HeartIcon className="w-5" /> Favoritos{' '}
              <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-secondary text-sm group-hover:bg-darkest group-hover:text-main">
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
