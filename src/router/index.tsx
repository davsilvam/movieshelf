import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { MovieDetails } from '../pages/MovieDetails'
import { Search } from '../pages/Search'

export const RouterPage: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/:id" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}
