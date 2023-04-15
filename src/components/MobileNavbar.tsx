import { FC, useState } from 'react'

// icons
import {
  Bookmarks,
  Heart,
  House,
  List,
  SquaresFour,
  Stack
} from '@phosphor-icons/react'

// router
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
      role="tab"
    >
      <div className="flex w-full flex-col items-center justify-center">
        <button
          onClick={toogleMobileNavbar}
          className="flex h-20 w-full items-center justify-center gap-2"
          aria-labelledby="abrir menu / fechar menu"
        >
          <List size={28} />
          <strong>Menu</strong>
        </button>

        <div className="flex w-full flex-col items-start gap-4 px-4 pb-4 md:flex-row">
          <div className="flex w-full flex-col gap-4 md:items-center">
            <strong className="text-sm uppercase text-cadet">Navegue</strong>
            <nav className="w-full space-y-2">
              <Link to="/" className="navbar-link">
                <House size={24} /> <span>Início</span>
              </Link>

              <Link to="/genres" className="navbar-link">
                <Stack size={24} /> <span>Gêneros</span>
              </Link>
            </nav>
          </div>

          <hr className="border-secondary-500" />

          <div className="flex w-full flex-col gap-4 md:items-center">
            <strong className="text-sm uppercase text-cadet">Biblioteca</strong>
            <nav className="w-full space-y-2">
              <Link to="/shelf" className="navbar-link">
                <SquaresFour size={24} /> <span>Estante</span>
              </Link>

              <Link to="/favorites" className="navbar-link">
                <Heart size={24} /> <span>Favoritos</span>
              </Link>

              <Link to="/saved" className="navbar-link">
                <Bookmarks size={24} /> <span>Salvos</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
