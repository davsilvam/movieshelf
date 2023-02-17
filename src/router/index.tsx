import { FC } from 'react'

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import {
  Favorites,
  Genres,
  Home,
  MovieDetails,
  Saved,
  Search,
  Shelf
} from '../pages/exports'

export const RouterPage: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/shelf" element={<Shelf />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
