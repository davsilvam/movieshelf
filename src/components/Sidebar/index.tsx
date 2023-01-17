import React from 'react'
import { Link } from 'react-router-dom'

import {
  BookmarkIcon,
  HeartIcon,
  HomeIcon,
  Square3Stack3DIcon
} from '@heroicons/react/24/outline'
import { useFavorites } from '../../contexts/FavoritesContext'

export const Sidebar: React.FC = () => {
  const { favorites } = useFavorites()

  return (
    <aside className="flex w-[16%] flex-shrink-0 flex-col gap-8 border-r border-r-cadet py-10 px-6 max-lg:hidden">
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
            <Link to="/categories" className="sidebar-link">
              <Square3Stack3DIcon className="w-5" /> Categorias
            </Link>
          </li>
        </ul>
      </div>

      <hr className="border-cadet opacity-50" />

      <div className="flex flex-col">
        <h3 className="mb-4 text-xs text-cadet">BIBLIOTECA</h3>
        <ul className="flex flex-col gap-2">
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
