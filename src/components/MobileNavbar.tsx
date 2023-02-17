import { FC, useState } from 'react'

// Icons
import {
  BookmarkIcon,
  Bars3Icon,
  HeartIcon,
  HomeIcon,
  Square3Stack3DIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline'

// Router
import { Link } from 'react-router-dom'

export const MobileNavbar: FC = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false)

  function toogleMobileNavbar() {
    setIsNavbarOpen(state => !state)
  }

  return (
    <div
      className={`fixed -bottom-[484px] md:-bottom-[268px] ${
        isNavbarOpen
          ? '-translate-y-[484px] md:-translate-y-[268px]'
          : 'translate-y-0'
      } z-20 flex w-full items-center justify-center border-t border-t-secondary-500 bg-secondary-800 transition-transform duration-300 lg:hidden`}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <button
          className="flex h-20 w-full items-center justify-center gap-2"
          onClick={toogleMobileNavbar}
        >
          <Bars3Icon className="w-8" />
          <h3>Menu</h3>
        </button>
        <nav className="flex w-full flex-col items-start gap-4 px-4 pb-4 md:flex-row">
          <div className="flex w-full flex-col md:items-center">
            <h3 className="mb-4 text-sm uppercase text-cadet">Navegue</h3>
            <ul className="flex w-full flex-col gap-2">
              <li>
                <Link to="/" className="navbar-link">
                  <HomeIcon className="w-5" /> Início
                </Link>
              </li>
              <li>
                <Link to="/genres" className="navbar-link">
                  <Square3Stack3DIcon className="w-5" /> Gêneros
                </Link>
              </li>
            </ul>
          </div>

          <hr className="border-secondary-500" />

          <div className="flex w-full flex-col md:items-center">
            <h3 className="mb-4 text-sm uppercase text-cadet">Biblioteca</h3>
            <ul className="flex w-full flex-col gap-2">
              <li>
                <Link to="/shelf" className="navbar-link group">
                  <Squares2X2Icon className="w-5" /> Estante{' '}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="navbar-link group">
                  <HeartIcon className="w-5" /> Favoritos{' '}
                </Link>
              </li>
              <li>
                <Link to="/saved" className="navbar-link">
                  <BookmarkIcon className="w-5" /> Salvos
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}
