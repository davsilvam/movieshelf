import { FC } from 'react'

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import { Favorites, Genres, Home, MovieDetails, Search } from '../pages'

export const RouterPage: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
