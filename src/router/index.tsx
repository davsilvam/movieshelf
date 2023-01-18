import React from 'react'

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import { Favorites, Home, MovieDetails, Search } from '../pages'

export const RouterPage: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}
