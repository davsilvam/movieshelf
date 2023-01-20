import React from 'react'

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import { Favorites, Genres, Home, Login, MovieDetails, Search, Success } from '../pages'

export const RouterPage: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/success" element={<Success />} />
        <Route path="/" element={<Home />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
